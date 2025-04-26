let calorieEstimate = 0;

function calculateEstimate() {
  const unit = document.getElementById('unit').value;
  const weight = parseFloat(document.getElementById('weight').value);

  if (isNaN(weight) || weight <= 0) {
    alert("Please enter a valid weight.");
    return;
  }

  if (unit === "lb") {
    calorieEstimate = weight * 15;
  } else if (unit === "kg") {
    calorieEstimate = weight * 33.07;
  }

  document.getElementById('estimateResult').innerText = 
    `Your initial calorie estimate is ${Math.round(calorieEstimate)} calories per day.`;
}

function calculateAdjustment() {
  const week1 = parseFloat(document.getElementById('week1').value);
  const week2 = parseFloat(document.getElementById('week2').value);

  if (isNaN(week1) || isNaN(week2) || week1 <= 0 || week2 <= 0) {
    alert("Please enter valid weights for both weeks.");
    return;
  }

  const weightChange = week2 - week1;
  const calorieChangePerDay = (weightChange * 3500) / 14; // 14 days

  let finalCalories = calorieEstimate;

  if (calorieChangePerDay > 0) {
    // Surplus - need to subtract
    finalCalories -= calorieChangePerDay;
  } else if (calorieChangePerDay < 0) {
    // Deficit - need to add
    finalCalories += Math.abs(calorieChangePerDay);
  }

  document.getElementById('finalResult').innerText = 
    `Your adjusted maintenance calories are approximately ${Math.round(finalCalories)} calories per day.`;
}
