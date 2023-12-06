const ConfirmModal = ({ onDelete, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>ยืนยันการลบบัญชีผู้ใช้รายนี้?</p>
          <button onClick={onDelete}>ลบ</button>
          <button onClick={onCancel}>ยกเลิก</button>
        </div>
      </div>
    );
  };

  export default ConfirmModal