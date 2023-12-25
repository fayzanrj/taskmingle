import React, { useState } from "react";

interface SendRemindersBtnProps {
  sendReminders: boolean;
}
const SendRemindersBtn: React.FC<SendRemindersBtnProps> = ({
  sendReminders,
}) => {
  // Variable state
  const [sendEmails, setSendEmails] = useState<boolean>(sendReminders);
  
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Text */}
      <p className="font-semibold">Send reminders through email</p>
      {/* Toggle button */}
      <div className="toggle-switch">
        <input
          className="toggle-input"
          id="toggle"
          type="checkbox"
          checked={sendEmails}
          onChange={() => setSendEmails(!sendEmails)}
        />
        <label className="toggle-label" htmlFor="toggle"></label>
      </div>
    </div>
  );
};

export default SendRemindersBtn;
