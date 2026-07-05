import react from 'react';
export default function LiveSupportButton() {
  return (
    <a href={'tel:&{suwaNumber}'} style={{
        background:'#2e7d32',
        color:'#fff',
        borderRadius:'999px',
        padding:'5px 12px',
        fontSize:'0.9rem',
        alignItems:'center',
        gap:'8px',
        textDecoration:'none',
        display:'inline-fixed',
        fontweight:'bold',
        cursor:'pointer',
        transition:'transform 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        📞 Live Support
    </a>
  );
}