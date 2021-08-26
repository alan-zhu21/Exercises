window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const principle = document.getElementById('loan-amount');
  const term = document.getElementById('loan-years');
  const yearlyRate = document.getElementById('loan-rate');
  principle.value = 50000;
  term.value = 5;
  yearlyRate.value = 3;
  calculateMonthlyPayment(getCurrentUIValues());
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(
    calculateMonthlyPayment(
      getCurrentUIValues()
    )
  ) 
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const interest = ((values.rate / 100) / 12);
  const numerator = (values.amount * interest);
  const n = (values.years * 12);
  const denominator = (1 - Math.pow((1 + interest), -n));
  return (numerator / denominator).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const visibleMonthly = document.getElementById('monthly-payment');
  visibleMonthly.innerHTML = monthly;
}
