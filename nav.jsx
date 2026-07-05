import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Ambulance,
  Shield,
  Users,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import "./StatsBar.css";

const stats = [
  {
    label: "Accidents This Year",
    value: "3,847",
    icon: AlertTriangle,
    trend: "+12% from last year",
    color: "text-primary",
    accent: "#d42b2b",
  },
  {
    label: "Lives Saved",
    value: "2,156",
    icon: CheckCircle2,
    trend: "Response improved 23%",
    color: "text-success",
    accent: "#2e7d32",
  },
  {
    label: "Ambulances Dispatched",
    value: "5,203",
    icon: Ambulance,
    trend: "Avg. 8 min response",
    color: "text-info",
    accent: "#1565c0",
  },
  {
    label: "Police Reports Filed",
    value: "3,412",
    icon: Shield,
    trend: "92% resolved",
    color: "text-info",
    accent: "#1565c0",
  },
  {
    label: "People Rescued",
    value: "4,891",
    icon: Users,
    trend: "↑ 18% survival rate",
    color: "text-success",
    accent: "#2e7d32",
  },
  {
    label: "Fatality Reduction",
    value: "31%",
    icon: TrendingDown,
    trend: "Compared to 2024",
    color: "text-success",
    accent: "#2e7d32",
  },
];

const StatsBar = () => {
  return (
    <div className="stats-bar">
      <div className="stats-bar__container">

        <div className="stats-bar__heading">
          <BarChart3 className="stats-bar__heading-icon" size={14} />
          <h3 className="stats-bar__heading-text">
            2025 Emergency Analytics — Sri Lanka
          </h3>
        </div>

        <div className="stats-bar__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="stats-bar__card"
              style={{ "--card-accent": stat.accent }}
            >
              <div className="stats-bar__card-top">
                <stat.icon
                  className={`stats-bar__icon ${stat.color}`}
                  size={13}
                />
                <span className="stats-bar__label">{stat.label}</span>
              </div>
              <p className="stats-bar__value">{stat.value}</p>
              <p className="stats-bar__trend">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StatsBar;