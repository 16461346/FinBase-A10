import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../Context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <StyledWrapper>
      <div className="profile-card shadow-2xl">
        <div className="cover-bg"></div> {/* Cover photo background */}
        <div className="profile-image">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User" />
          ) : (
            <div className="placeholder">
              <span>?</span>
            </div>
          )}
        </div>
        <div className="profile-info">
          <p className="profile-name">{user?.displayName || "Guest User"}</p>
          <div className="profile-title">{user?.email || "Email not found"}</div>
        </div>
        <button className="cta-button">Update Profile</button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .profile-card {
    position: relative;
    width: 100%;
    max-width: 520px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(48px);
    border-radius: 20px;
    padding: 3rem 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    margin: 2rem auto;
    overflow: hidden;
  }

  .cover-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 180px;
    background: linear-gradient(135deg, #a50bad, #6e36ff);
    border-radius: 20px 20px 0 0;
    z-index: 0;
  }

  .profile-image {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #f0f2f5;
    margin: 80px auto 1.5rem;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #666;
  }

  .profile-info {
    text-align: center;
    margin-bottom: 2rem;
  }

  .profile-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  .profile-title {
    font-size: 1rem;
    color: #555;
  }

  .cta-button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #7d988a, #4d5d54);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .cta-button:hover {
    transform: translateY(-3px);
    filter: brightness(1.1);
  }

  /* ✅ Responsive Design */
  @media (max-width: 768px) {
    .profile-card {
      padding: 2rem 1.5rem;
    }
    .profile-image {
      width: 120px;
      height: 120px;
      margin: 70px auto 1rem;
    }
    .cover-bg {
      height: 140px;
    }
    .profile-name {
      font-size: 1.4rem;
    }
    .profile-title {
      font-size: 0.9rem;
    }
    .cta-button {
      font-size: 1rem;
      padding: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .profile-card {
      padding: 1.5rem 1rem;
    }
    .profile-image {
      width: 100px;
      height: 100px;
      margin: 60px auto 1rem;
    }
    .cover-bg {
      height: 120px;
    }
    .profile-name {
      font-size: 1.2rem;
    }
    .profile-title {
      font-size: 0.85rem;
    }
  }
`;

export default Profile;
