import React, { useContext, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import CustomerContext from './CustomerContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const { customers } = useContext(CustomerContext);
  const [selectedInterval, setSelectedInterval] = useState('month');

  useEffect(() => {
    const buttons = document.querySelectorAll('.switch');
    const indicator = document.querySelector('.indicator');

    const moveIndicator = (activeButton) => {
      const activeRect = activeButton.getBoundingClientRect();
      const containerRect = activeButton.parentNode.getBoundingClientRect();
      indicator.style.width = `${activeRect.width}px`;
      indicator.style.left = `${activeRect.left - containerRect.left}px`;
    };

    buttons.forEach(button => {
      button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        moveIndicator(this);
      });
    });

    const activeButton = document.querySelector('.switch.active');
    if (activeButton) {
      moveIndicator(activeButton);
    }

    // Clean up event listeners
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', function() {
          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          moveIndicator(this);
        });
      });
    };
  }, [selectedInterval]);

  const getCustomerCounts = () => {
    let counts;
    switch (selectedInterval) {
      case 'month':
        counts = getMonthlyCustomerCounts();
        break;
      case 'year':
        counts = getYearlyCustomerCounts();
        break;
      case 'day':
        counts = getDailyCustomerCounts();
        break;
      default:
        counts = [];
        break;
    }
    return counts;
  };

  const getMonthlyCustomerCounts = () => {
    const counts = Array(12).fill(0);
    customers.forEach(customer => {
      const month = customer.createdAt.getMonth();
      counts[month]++;
    });
    return counts;
  };

  const getYearlyCustomerCounts = () => {
    const counts = Array(12).fill(0);
    customers.forEach(customer => {
      const year = customer.createdAt.getFullYear();
      counts[year]++;
    });
    return counts;
  };

  const getDailyCustomerCounts = () => {
    const counts = Array(31).fill(0); // Assuming 31 days for simplicity
    customers.forEach(customer => {
      const day = customer.createdAt.getDate() - 1; // Adjust for zero-based index
      counts[day]++;
    });
    return counts;
  };

  const monthlyCustomerCounts = getCustomerCounts();

  const barChartData = {
    labels: selectedInterval === 'day'
      ? Array.from({ length: 31 }, (_, i) => i + 1) // Days of the month
      : selectedInterval === 'year'
        ? Array.from({ length: 12 }, (_, i) => i + 1) // Years
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months of the year
    datasets: [
      {
        label: `Customer Count (${selectedInterval})`,
        data: monthlyCustomerCounts,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark color for the bars
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: `Customer Counts by ${selectedInterval.charAt(0).toUpperCase() + selectedInterval.slice(1)}`,
      },
    },
    scales: {
      x: {
        display: true, // Show x-axis labels
      },
      y: {
        display: true, // Show y-axis labels
        beginAtZero: true,
      },
    },
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <div>
      <div className="switch-container">
        <button className="switch active" onClick={() => handleIntervalChange('month')}>Month</button>
        <button className="switch" onClick={() => handleIntervalChange('year')}>Year</button>
        <button className="switch" onClick={() => handleIntervalChange('day')}>Day</button>
        <div className="indicator"></div>
      </div>
      <Bar data={barChartData} options={barChartOptions} />
    </div>
  );
};

export default BarChart;
