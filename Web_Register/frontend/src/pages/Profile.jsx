import { useState, useEffect } from "react";
import {
    FaChartLine,
    FaProjectDiagram,
    FaClock,
    FaFire
} from "react-icons/fa";

import SideBar from "../components/SideBar";
import StatsCard from "../components/StatsCard";
import ProfileCard from "../components/ProfileCard";

import "../styles/profile.css";

function Profile() {
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({
        uid: "",
        name: "",
        email: "Đang tải email...",
        phone: "",
        address: "",
        birthday: ""
    });

    // Khai báo backendURL dùng chung cho cả file
    const backendURL = import.meta.env.VITE_API_URL || "https://web-register-new.onrender.com";

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    const currentUid = parsedUser.uid || parsedUser.id || "";

                    setUser({
                        uid: currentUid,
                        name: parsedUser.fullName || parsedUser.name || "",
                        email: parsedUser.email || parsedUser.mail || "",
                        phone: parsedUser.phoneNumber || parsedUser.phone || "",
                        address: parsedUser.address || "",
                        birthday: parsedUser.dateOfBirth || parsedUser.birthday || ""
                    });

                    if (currentUid) {
                        const token = localStorage.getItem("token");
                        // SỬA LỖI 1: Thay localhost bằng backendURL
                        const res = await fetch(`${backendURL}/api/users/${currentUid}`, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        const data = await res.json();
                        if (res.ok && data.success && data.user) {
                            setUser({
                                uid: currentUid,
                                name: data.user.fullName || "",
                                email: data.user.email || "",
                                phone: data.user.phoneNumber || "",
                                address: data.user.address || "",
                                birthday: data.user.dateOfBirth || ""
                            });
                        }
                    }
                } catch (error) {
                    console.error("Failed to load user profile", error);
                }
            }
        };

        fetchUserData();
    }, [backendURL]); // Thêm backendURL vào dependency

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        if (!user.uid) {
            alert("Không tìm thấy User ID. Vui lòng đăng nhập lại!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            
            // SỬA LỖI 1: Thay localhost bằng backendURL
            const response = await fetch(`${backendURL}/api/users/${user.uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName: user.name,
                    phoneNumber: user.phone,
                    address: user.address,
                    dateOfBirth: user.birthday
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                const updatedUser = { 
                    ...JSON.parse(localStorage.getItem("user") || "{}"), 
                    fullName: user.name, 
                    phoneNumber: user.phone, 
                    address: user.address, 
                    dateOfBirth: user.birthday 
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));

                alert("Profile Updated Successfully on Firebase!");
                setEdit(false);
            } else {
                alert("Failed to update profile: " + data.message);
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Cannot connect to server to update profile!");
        }
    };

    return (
        <div className="profile-page">
            {/* SỬA LỖI 2: Đổi <Sidebar /> thành <SideBar /> cho đúng tên file import */}
            <SideBar />
            <div className="profile-content">
                <div className="dashboard">
                    <StatsCard
                        title="Login"
                        value="156"
                        color="#3b82f6"
                        icon={<FaChartLine />}
                    />
                    <StatsCard
                        title="Projects"
                        value="12"
                        color="#22c55e"
                        icon={<FaProjectDiagram />}
                    />
                    <StatsCard
                        title="Hours"
                        value="356"
                        color="#f59e0b"
                        icon={<FaClock />}
                    />
                    <StatsCard
                        title="AI Score"
                        value="98"
                        color="#ef4444"
                        icon={<FaFire />}
                    />
                </div>

                <ProfileCard
                    user={user}
                    edit={edit}
                    onChange={handleChange}
                    onEdit={() => setEdit(true)}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}

export default Profile;