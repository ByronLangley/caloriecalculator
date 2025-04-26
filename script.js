let baseCalories = 0;

document.addEventListener('DOMContentLoaded', () => {
  const week1 = document.getElementById('week1Inputs');
  const week2 = document.getElementById('week2Inputs');
  for (let i = 1; i <= 7; i++) {
    week1.appendChild(createWeightInput(`w1d${i}`, `Day ${i}`));
    week2.appendChild(createWeightInput(`w2d${i}`, `Day ${i + 7}`));
  }
});

function createWeightInput(id, placeholder) {
  const input = document.createElement('input');
  input.type = 'number';
  input.id = id;
  input.placeholder = placeholder;
  input.style.margin = '5px';
  input.style.width = '100px';
  return input;
}

function getCalorieTarget() {
  const weight = parseFloat(document.getElementById('initialWeight').value);
  const unit = document.getElementById('initialUnit').value;
  if (isNaN(weight)) return;
  const factor = unit === 'lb' ? 15 : 33.07;
  baseCalories = Math.round(weight * factor);
  document.getElementById('calorieTarget').textContent = `For the next 2 weeks you should eat ${baseCalories} calories per day.`;

  // Sync unit for daily weigh-ins with initial selection
  document.getElementById('dailyUnit').value = unit;
}

function calculateCalories() {
  const unit = document.getElementById('dailyUnit').value;
  const week1 = getWeekAvg('w1d');
  const week2 = getWeekAvg('w2d');
  if (week1 === null || week2 === null) return;

  const diff = week2 - week1;
  const calorieFactor = unit === 'lb' ? 3500 : 7700;
  const totalCalorieChange = diff * calorieFactor;
  const dailyChange = Math.round(totalCalorieChange / 14);

  let status = dailyChange > 0 ? 'surplus' : (dailyChange < 0 ? 'deficit' : 'maintenance');

  let finalCalories = baseCalories;
  if (status === 'deficit') {
    finalCalories += Math.abs(dailyChange);
  } else if (status === 'surplus') {
    finalCalories -= Math.abs(dailyChange);
  }

  document.getElementById('results').innerHTML = `
    Over the past 2 weeks you were in a ${Math.abs(dailyChange)} calorie ${status}.<br>
    Your updated daily calorie burn estimate is approximately ${finalCalories} calories.
  `;
}

function getWeekAvg(prefix) {
  let total = 0;
  for (let i = 1; i <= 7; i++) {
    const val = parseFloat(document.getElementById(`${prefix}${i}`).value);
    if (isNaN(val)) return null;
    total += val;
  }
  return total / 7;
}

function syncUnitSelection() {
  const selectedUnit = document.getElementById('initialUnit').value;
  document.getElementById('dailyUnit').value = selectedUnit;
}
