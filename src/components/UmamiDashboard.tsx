import React from 'react';

const UmamiDashboard: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://cloud.umami.is/share/IegbsPQlTFGTBTJX"
        className="w-full h-full border-0"
        title="Umami Analytics Dashboard"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};

export default UmamiDashboard;