const Accident = require('../models/Accident');


exports.createReport = async (req, res) => {
  try {
    if (!req.body.location || !req.body.incidentType) {
      return res.status(400).json({ success: false, message: "Missing required accident details" });
    }

    const report = await Accident.create(req.body); // send data to database

    
    const io = req.app.get('socketio');
    if (io) {
      io.emit('new_accident', report);
    }

    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Accident.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error fetching reports" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Accident.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Accident report not found" });
    }

    const io = req.app.get('socketio');
    if (io) {
      io.emit('status_updated', updated);
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
