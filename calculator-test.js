
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 50000, years: 5, rate: 3})).toEqual('898.43');
  expect(calculateMonthlyPayment({amount: 285000, years: 30, rate: 3})).toEqual('1201.57');
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 10000, years: 5, rate: 3})).toEqual('179.69')
});

/// etc
