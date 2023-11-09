(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const nameInput = form.querySelector('[name="name"]');
            const nameValue = nameInput.value;
            const discountPercentageInput = form.querySelector('[name="discountPercentage"]');
            const discountPercentageValue = discountPercentageInput.value;

            if (/^\s*$/.test(nameValue) || nameValue === '' || nameValue.length > 15) {
                showAlert('Enter a valid name.');
                return;
            }

            const discountValue = parseInt(discountPercentageValue);
            if (/^\s*$/.test(discountPercentageValue) || isNaN(discountValue) || discountValue > 80 || discountValue < 0) {
                showAlert('Enter a valid discount percentage between 0 and 80.');
                return;
            }

            try {
              const response = await fetch("/admin/createCategory", {
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: nameValue, discountPercentage: discountPercentageValue }),
              }).then(response=>response.json()).then(data=>{
                if(data.category==="exist"){
                  showAlert(data.message)
                }else if(data.category==="true"){
                  showSuccess("Updating");
                  window.location.reload()
                }else{
                  showAlert("Error While Updating!!")
                }
              })
            } catch (error) {
                console.error('Error submitting the form:', error);
                showAlert('An error occurred while submitting the form.');
            }
        });
    });
})();