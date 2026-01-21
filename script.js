// Generate hour checkpoints
function createCheckpoints() {
  const container = document.getElementById('checkpoints');
  const boldTimes = ['8:00am', '1:30pm', '5:00pm', '8:00pm'];
  
  // Create checkpoints for every hour, plus 1:30pm
  //made by Rafi
  const checkpointTimes = [];
  
  for (let i = 0; i < 24; i++) {
    const hour = i === 0 ? 12 : (i > 12 ? i - 12 : i);
    const period = i < 12 ? 'am' : 'pm';
    checkpointTimes.push({
      label: `${hour}:00${period}`,
      minutes: i * 60
    });
  }
  
  // Add 1:30pm
  checkpointTimes.push({
    label: '1:30pm',
    minutes: 13 * 60 + 30
  });
  
  // Sort by minutes
  checkpointTimes.sort((a, b) => a.minutes - b.minutes);
  
  checkpointTimes.forEach(({ label, minutes }) => {
    const checkpoint = document.createElement('div');
    checkpoint.className = 'checkpoint';
    if (boldTimes.includes(label)) {
      checkpoint.classList.add('bold');
    }
    checkpoint.textContent = label;
    
    // Position based on time
    const percentage = (minutes / (24 * 60)) * 100;
    checkpoint.style.position = 'absolute';
    checkpoint.style.top = `calc(${percentage}% + 20px - ${percentage * 0.4}px)`;
    
    container.appendChild(checkpoint);
  });
}

// Update the time line position
function updateTimeLine() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  
  // Calculate total minutes since midnight with precision
  const totalMinutes = hours * 60 + minutes + seconds / 60 + milliseconds / 60000;
  const totalMinutesInDay = 24 * 60;
  
  // Calculate percentage of day passed
  const percentage = (totalMinutes / totalMinutesInDay) * 100;
  
  // Update line position
  const timeLine = document.getElementById('time-line');
  timeLine.style.top = `${percentage}%`;
}

// Initialize
function init() {
  createCheckpoints();
  updateTimeLine();
  
  // Update every 100ms for smooth movement
  setInterval(updateTimeLine, 100);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
