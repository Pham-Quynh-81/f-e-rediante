//banner
document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 1;
  const totalSlides = 3;
  const slideDuration = 5000;

  function nextSlide() {
    currentSlide = (currentSlide % totalSlides) + 1;
    document.getElementById(`banner-${currentSlide}-th`).checked = true;
  }

  setInterval(nextSlide, slideDuration);
});


//dropdown navbar
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bar").addEventListener("click", function () {
    console.log("Clicked #bar");
    var menuList = document.querySelector(".menu-list");
    var dark_mode = document.querySelector(".dark-mode");
    menuList.classList.toggle("active");

    var icon = document.querySelector("#header .mobile #bar");
    icon.style.display = "none";

    document.getElementById("xmark").style.display = "initial";
    console.log("#xmark displayed");
    dark_mode.style.display = "initial";

    dark_mode.style.height = window.innerHeight + "px";
    dark_mode.style.width = window.innerWidth + "px"; 
  });

  document.getElementById("xmark").addEventListener("click", function () {
    console.log("Clicked #xmark");
    var menuList = document.querySelector(".menu-list");
    menuList.classList.remove("active");

    var icon = document.querySelector("#header .mobile #bar");
    icon.style.display = "initial";

    document.getElementById("xmark").style.display = "none";
    console.log("#xmark hidden");
    document.querySelector(".dark-mode").style.display = "none";
  });
});

// giữ trạng thái trang truy cập trang
document.addEventListener("DOMContentLoaded", function () {
  var currentPageUrl = window.location.href;
  var menuLinks = document.querySelectorAll(".menu-list li a");
  menuLinks.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add("active");
    }
  });
});
//lọc
// Khi nhấp vào thương hiệu

document.addEventListener("DOMContentLoaded", function () {
  var favItems = document.querySelectorAll(".list-brand div");

  favItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var selectedBrand = item.getAttribute("data-brand");
      window.location.href = "store.html?brand=" + encodeURIComponent(selectedBrand);
    });
  });
});

// Khi nhấp vào mùi hương

document.addEventListener("DOMContentLoaded", function () {
  var favItems = document.querySelectorAll(".list-fav div");

  favItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var selectedScent = item.getAttribute("data-scent");
      window.location.href = "store.html?scent=" + encodeURIComponent(selectedScent);
    });
  });
});
//đăng ký, kiểm tra password
//eye-login
import { user } from "./datauser.js";
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("password");
  var togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});
//eye-regis
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("pass");
  var togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("repass");
  var togglePassword = document.getElementById("rtoggle-password");

  togglePassword.addEventListener("click", function () {
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("pass-l");
  var togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    console.log("Clicked on the eye icon");
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});
function formregis() {
  document
    .getElementById("register-button")
    .addEventListener("click", function () {
      location.assign("./register.html");
    });
}

async function regis(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var tel = document.getElementById("tel").value;
  var password = document.getElementById("pass").value;
  var address = document.getElementById("address").value;

  var newUser = {
    username: username,
    phone: tel,
    email: email,
    address: address,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const err = await response.json()
    console.log(err)
    if(response.ok && err.err == 1) {
      showPopup("Tài khoản đã tồn tại!");
    }
    else if (response.ok && err.err == 0) {
      localStorage.setItem("isLoggedIn", "false");
      window.location.href = "./login.html";
    } 
    else {
      console.error("Failed to register:", response.statusText);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }

  return false;
}


// Function to show a general pop-up
function showPopup(message) {
  var popupMessage = document.getElementById("popup-message");

  popupMessage.textContent = message;
  document.getElementById("popup").style.display = "block";
}

// Function to close the pop-up
document.addEventListener("DOMContentLoaded", function () {
  var but = document.querySelector(".close");
  but.addEventListener("click", () => {
  document.getElementById("popup").style.display = "none"
}) 
});


//Đăng nhập

// Hàm để lưu trữ thông tin đăng nhập vào cookie
function setLoginCredentials(userName, userPass, remember) {
  // Thời gian hết hạn của cookie (ở đây là 30 ngày)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  // Tạo đối tượng lưu trữ thông tin đăng nhập
  const credentials = {
    userName: userName,
    userPass: userPass,
    remember: remember
  };

  // Chuyển đổi đối tượng thành chuỗi JSON
  const credentialsJSON = JSON.stringify(credentials);

  // Lưu trữ thông tin đăng nhập vào cookie
  document.cookie = "loginCredentials=" + encodeURIComponent(credentialsJSON) +
    "; expires=" + expirationDate.toUTCString() + "; path=/";
}

// Hàm để đọc thông tin đăng nhập từ cookie
function getLoginCredentials() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith("loginCredentials=")) {
      const cookieValue = decodeURIComponent(cookie.substring("loginCredentials=".length));

      try {
        // Phân tích chuỗi JSON thành đối tượng
        const credentials = JSON.parse(cookieValue);
        return credentials;
      } catch (error) {
        console.error("Lỗi phân tích chuỗi JSON: " + error);
      }
    }
  }

  return null;
}
//

document.addEventListener("DOMContentLoaded", function () {

  const credentials = getLoginCredentials();
  if (credentials && credentials.remember) {
    const userNameInput = document.getElementById("username");
    const userPassInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById("rememberCheckbox");

    // Đặt giá trị của ô input và check-box từ thông tin đăng nhập được lưu trữ
    userNameInput.value = credentials.userName;
    userPassInput.value = credentials.userPass;
    rememberCheckbox.checked = true;
  }

  var loginForm = document.getElementById("form-login");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var userName = document.getElementById("username").value;
    var userPass = document.getElementById("password").value;
    var errorContainer = document.getElementById("account-null");
    // console.log("hello")
    if (!userName || !userPass) {
      errorContainer.textContent = "Bạn chưa nhập tên đăng nhập hoặc mật khẩu!";
    } else {
      try {
        // console.log("hello")
        var response = await fetch("http://localhost:3000/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: userName,
            password: userPass,
          }),
        });
        // console.log(response);
        const result = await response.json();

        // console.log(result);
        if (!result.err) {  
          const remember = document.getElementById("rememberCheckbox").checked;

          if (remember) // Thêm cookie
          {
            setLoginCredentials(userName, userPass, remember);
          }
          else // Xoá cookie
          {
            document.cookie = "loginCredentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("access_token_SM", result.access_token);
          window.location.href = "./home.html";
        } else {
          console.error("Failed to login:", response.statusText);
          errorContainer.textContent = "Tài khoản đăng nhập chưa chính xác!";
          localStorage.setItem("isLoggedIn", "false");
        }
      } catch (error) {
        console.error("Error during login:", error);
        localStorage.setItem("isLoggedIn", "false");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var userLink = document.getElementById("user-link");
  var mUserLink = document.getElementById("m-user-link");
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // Nếu đăng nhập, hiển thị icon user
    userLink.innerHTML = '<i class="fa-solid fa-user"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-user"></i>';
    userLink.href = "./user.html";
    mUserLink.href = "./user.html";
  } else {
    // Nếu chưa đăng nhập, hiển thị icon login
    userLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    userLink.href = "./login.html";
    mUserLink.href = "./login.html";
  }
});

// lấy dữ liệu cho user
document.addEventListener("DOMContentLoaded", function () {
  var profileLink = document.getElementById("profile");
  var changePassLink = document.getElementById("change-pass");
  var userForm = document.getElementById("user-form");
  var proWrapper = document.getElementById("pro-wrapper");
  var changeWrapper = document.getElementById("change-wrapper");

  showUserInfo();
  profileLink.addEventListener("click", function (event) {
    event.preventDefault();
    showUserInfo();
  });

  //click vào "Đổi mật khẩu"
  changePassLink.addEventListener("click", function (event) {
    event.preventDefault();
    showChangePasswordForm();
  });

  // Xử lý sự kiện khi submit form cập nhật thông tin người dùng
  userForm.addEventListener("submit", function (event) {
    event.preventDefault();
     updateUserInfo();
    // Hiển thị lại thông tin người dùng sau khi cập nhật
    // showUserInfo();
    window.location.reload();
  });

  async function updateUserInfo() {
    const usernameInput = document.getElementById("username-l").value;
    const emailInput = document.getElementById("email-l").value;
    const telInput = document.getElementById("tel-l").value;
    const addressInput = document.getElementById("address-l").value;
  
    try {
      const access_token = localStorage.getItem("access_token_SM");
      var response = await fetch("http://localhost:3000/api/v1/user/update", {
        method: "POST",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: access_token,
          username: usernameInput,
          email: emailInput,
          tel: telInput,
          address: addressInput,
        }),
      });
  
      if (response.ok) {
        alert("User information updated successfully!");
        // Optionally, you can redirect or perform other actions here
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during user information update:", error);
    }
  }
  


  function showUserInfo() {
    proWrapper.style.display = "block";
    changeWrapper.style.display = "none";
    getUser();
  }

    async function getUser() {
      const access_token = localStorage.getItem("access_token_SM");
      const API_URL = "http://localhost:3000/api/v1";
      try {
        const response = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: {
            Authorization: access_token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        const data = userData.userData
        // Gọi hàm để điền thông tin người dùng vào các trường trên trang
        fillUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }

    // Hàm để điền thông tin người dùng vào các trường trên trang
    function fillUserData(userData) {
      const usernameInput = document.getElementById("username-l");
      const emailInput = document.getElementById("email-l");
      const telInput = document.getElementById("tel-l");
      const addressInput = document.getElementById("address-l");
    
      // Check if the DOM elements exist before trying to update them
      if (usernameInput) {
        usernameInput.value = userData.username || ""; // Use the userData object properties
      }
    
      if (emailInput) {
        emailInput.value = userData.email || "";
      }
    
      if (telInput) {
        telInput.value = userData.phone || "";
      }
    
      if (addressInput) {
        addressInput.value = userData.address || "";
      }
    }

    async function changePassword(event) {
      event.preventDefault();
      var currentPassword = document.getElementById("new-username").value;
      var newPassword = document.getElementById("new-password").value;
      var confirmNewPassword = document.getElementById("confirm-new-password").value;
    
      if (newPassword !== confirmNewPassword) {
        openCustomPopup("Mật khẩu mới và xác nhận mật khẩu mới không khớp.",3000);
        // alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
      } else {
        try {
          const access_token = localStorage.getItem("access_token_SM");
          var response = await fetch("http://localhost:3000/api/v1/auth/changePassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: access_token,
              oldPassword: currentPassword,
              newPassword: newPassword,
            }),
          });
          const errorData = await response.json();
          console.log(errorData)
          if (errorData.err == 1) {
            // alert("Mật khẩu hiện tại không đúng mời bạn nhập lại!");
            openCustomPopup("Mật khẩu hiện tại không đúng mời bạn nhập lại!",3000);
          }
          else if (errorData.err == 2) {
            // alert("Mật khẩu đã được thay đổi thành công!");
            openCustomPopup("Mật khẩu đã được thay đổi thành công!",3000);
            localStorage.setItem("isLoggedIn", "false");
            window.location.href = "./home.html";
          } 
          else {
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error("Error during password change:", error);
        }
      }
    }
  function showChangePasswordForm() {
    proWrapper.style.display = "none";
    changeWrapper.style.display = "block";
    changeWrapper.innerHTML = `
      <form id="changePasswordForm" onsubmit="changePassword">
        <h1 class="form-heading">Đổi mật khẩu</h1>
        <div class="form-group">
          <i class="far fa-user"></i>
          <input id="new-username" type="password" class="form-input" placeholder="Mật khẩu hiện tại">
          <i class="far fa-eye" id="oldpassword"></i>
        </div>
        <div class="form-group">
          <i class="fas fa-key"></i>
          <input id="new-password" type="password" class="form-input" placeholder="Mật khẩu mới">
          <i class="far fa-eye" id="newpassword"></i>
        </div>
        <div class="form-group">
          <i class="fa-solid fa-lock"></i>
          <input id="confirm-new-password" type="password" class="form-input" placeholder="Nhập lại mật khẩu mới">
          <i class="far fa-eye" id="rnewpassword"></i>
        </div>
        <div class="bt-update">
          <input type="submit" value="Lưu" class="user-form" >
        </div>
      </form>
      <div id="passPopup" class="popup">
            <div class="popup-content">
                <p id="popupMessage"></p>
            </div>
        </div> 

    `;

    document.getElementById("changePasswordForm").onsubmit = changePassword;
  }
});

function openCustomPopup(message, displayTime) {
  var popupMessageElement = document.getElementById('popupMessage');
  var customPopupElement = document.getElementById('passPopup');

  popupMessageElement.innerHTML = message;
  customPopupElement.style.display = 'block';

  // Thiết lập thời gian hiển thị popup
  setTimeout(function() {
    customPopupElement.style.display = 'none';
  }, displayTime);
}


//Đăng xuất

document.addEventListener("DOMContentLoaded", function () {
  var logoutbutton = document.getElementById("logout");
  var userLink = document.getElementById("user-link");
  var mUserLink = document.getElementById("m-user-link");
  logoutbutton.addEventListener("click", function () {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("access_token_SM","")
    userLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    window.location.href = "./home.html";
  });
});
//đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  var regisForm = document.getElementById("form-register");

  regisForm.addEventListener("submit", function (event) {
    var password = document.getElementById("pass").value;
    var confirmPassword = document.getElementById("repass").value;
    var email = document.getElementById("email").value;

    var errorContainer = document.getElementById("error-message");
    var passwordErrorContainer = document.getElementById("password-error");
    var errorMessage = document.getElementById("error-email");

    var hasError = false;

    function isValidEmail(email) {
      // Biểu thức chính quy kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Kiểm tra xem email có khớp với biểu thức chính quy không
      return emailRegex.test(email);
    }

    if (!isValidEmail(email)) {
      errorMessage.textContent = "Vui lòng nhập đúng định dạng email!";
      event.preventDefault();
      hasError = true;
    } else {
      errorMessage.textContent = "";
    }

    // Kiểm tra mật khẩu đầu vào
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,20}$/;

    if (!passwordRegex.test(password)) {
      errorContainer.textContent = "Mật khẩu tối thiểu 8 ký tự bao gồm số, chữ in thường, chữ in hoa và ký tự đặc biệt";
      event.preventDefault();
      hasError = true;
    } else {
      errorContainer.textContent = "";
    }


    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      passwordErrorContainer.textContent = "Mật khẩu nhập lại không khớp!";
      event.preventDefault();
      hasError = true;
    } else {
      passwordErrorContainer.textContent = "";
    }

    if (!hasError) {
      return regis(event);
    }
  });
});

function start() {
  formregis();

}
start();
