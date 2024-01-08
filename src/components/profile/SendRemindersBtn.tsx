import React, { useState } from "react";

const SendRemindersBtn = ({ sendReminders }: { sendReminders: boolean }) => {
  // Variable state
  const [sendEmails, setSendEmails] = useState<boolean>(sendReminders);

  const toggleSendEmails = (): void => setSendEmails(!sendEmails);
  return (
    <div className="mt-4 flex items-center justify-between">
      {/* Text */}
      <p className="font-semibold">Send reminders through email</p>
      {/* Toggle button */}
      <div className="toggle-switch">
        <input
          id="toggle"
          type="checkbox"
          checked={sendEmails}
          onChange={toggleSendEmails}
          className="toggle-input"
        />
        <label className="toggle-label" htmlFor="toggle"></label>
      </div>
    </div>
  );
};

export default SendRemindersBtn;
