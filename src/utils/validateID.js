export default function validateThaiIDNumber(idNumber) {
    // Check if the ID number is a string and has exactly 13 digits
    if (typeof idNumber !== 'string' || idNumber.length !== 13 || isNaN(idNumber)) {
      return false; // Return false for invalid length or non-numeric values
    }
  
    // Calculate the check digit based on the algorithm for Thai ID numbers
    const total = idNumber
      .slice(0, 12)
      .split('')
      .reduce((acc, digit, index) => acc + parseInt(digit) * (13 - index), 0);
  
    const checkDigit = (11 - (total % 11)) % 10;
  
    // Compare the calculated check digit with the last digit of the ID number
    return parseInt(idNumber[12], 10) === checkDigit;
  }