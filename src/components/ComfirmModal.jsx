const ConfirmModal = ({ onDelete, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>ยืนยันการลบข้อมูลผู้ใช้รายนี้ออกจากฐานข้อมูล?</p>
          <button onClick={onDelete} className="confirm">ลบ</button>
          <button onClick={onCancel} className="cancle">ยกเลิก</button>
        </div>
      </div>
    );
  };

  export default ConfirmModal