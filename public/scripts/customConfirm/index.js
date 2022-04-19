const confirmContainer = document.querySelector('#custom-confirm');
confirmContainer.innerHTML = `
  <div class="confirm-popup">
    <div class="confirm-message">
    </div>
    <div class="confirm-btns">
      <div class="cancel-btn">
        Hủy
      </div>
      <div class="agree-btn">
      </div>
    </div>
  </div>
`;
const confirmPopup = document.querySelector('#custom-confirm .confirm-popup');
const confirmMessage = document.querySelector('#custom-confirm .confirm-message');
const cancelConfirmBtn = document.querySelector('#custom-confirm .cancel-btn');
const agreeConfirmBtn = document.querySelector('#custom-confirm .agree-btn');
const colorTypes = {
  primary: '#3571d3',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0'
};

const customConfirm = function({
  message = 'Bạn xác nhận điều này?', 
  type = 'Xác nhận', 
  colorType = 'primary',
  callbackAgree = function() {
    console.log('Confirm');
  },
  callbackCancel = function() {
    console.log('Cancel');
  }
}) {   
  confirmContainer.style.display = 'block';
  confirmMessage.innerText = message;
  agreeConfirmBtn.innerText = type;

  const colorCode = colorTypes[colorType] || colorTypes['primary'];
  // Set màu cho nút Agree
  agreeConfirmBtn.style.backgroundColor = colorCode + 'cc';
  agreeConfirmBtn.addEventListener('mouseenter', function() {
    agreeConfirmBtn.style.backgroundColor = colorCode;
  });
  agreeConfirmBtn.addEventListener('mouseleave', function() {
    agreeConfirmBtn.style.backgroundColor = colorCode + 'cc';
  });
  
  const agreeHandler = function() {
    callbackAgree();
    removeHandlers();
  };
  const cancelHandler = function() {
    callbackCancel();
    removeHandlers();
  };

  const removeHandlers = function() {        
    confirmContainer.style.display = 'none';
    agreeConfirmBtn.removeEventListener('click', agreeHandler);
    cancelConfirmBtn.removeEventListener('click', cancelHandler);
    confirmContainer.removeEventListener('click', cancelHandler);
  }

  agreeConfirmBtn.addEventListener('click', agreeHandler);
  cancelConfirmBtn.addEventListener('click', cancelHandler);
  confirmContainer.addEventListener('click', cancelHandler);
  confirmPopup.addEventListener('click', function(e) {
    e.stopPropagation();
  });
};