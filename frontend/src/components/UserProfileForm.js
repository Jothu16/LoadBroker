import React from 'react';

function UserProfileForm() {
    return (
        <form>
            {/* ... other fields */}
            
            <label>Truck Model:</label>
            <input type="text" name="truckModel" placeholder="e.g., Volvo FH16" required />
            
            <label>Truck Year:</label>
            <input type="number" name="truckYear" placeholder="e.g., 2022" required min="1900" max="2099" />
            
            {/* ... other fields */}
            
            <input type="submit" value="Update Profile" />
        </form>
    );
}

export default UserProfileForm;
