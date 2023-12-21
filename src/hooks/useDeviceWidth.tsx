import { useState, useEffect } from 'react';

const useDeviceWidth = (): number => {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    // Function to update device width when the window is resized
    const handleResize = (): void => {
      setDeviceWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return deviceWidth;
};

export default useDeviceWidth;
