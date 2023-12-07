export default function convertToThaiDate(mysqlDate) {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
  
    const [year, month, day] = mysqlDate.split('-').map(Number);
  
    const thaiMonth = months[month - 1];
    const thaiYear = year + 543;
  
    return `${day} ${thaiMonth} ${thaiYear}`;
  }