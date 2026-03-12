const storage_key = 'users'; 

// فانكشن اجيب بيها بيانات المستخدمين الي عندي كلها 
function getUsers(){
    const userJson = localStorage.getItem(storage_key);
    return userJson? JSON.parse(userJson):[]; //لو لقيت داتا حولها من السترينج ولو فاضي رجع اراي فاضي
}

// لتخزين اليوزر الجديد جوا مصفوفة اليوزرز الي عندي
function saveUsers(users) {
    localStorage.setItem(storage_key, JSON.stringify(users));//عشان localStorage بتاخد سترينج بس
}



function registerUser(userData) {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'this email is already exist' };
    }
    users.push({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
    saveUsers(users);
    return { success: true, message: 'register successed!' };
}

function loginUser(userData) {
    const users = getUsers();
    const user = users.find(u => u.email === userData.email);
    if (!user) {
        return { success: false, message: 'user not found' };
    }
    if (user.password !== userData.password) {
        return { success: false, message: 'password is wrong ' };
    }
    return { success: true, user: { name: user.name, email: user.email } };
}

