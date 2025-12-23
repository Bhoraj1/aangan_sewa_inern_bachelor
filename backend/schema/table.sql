CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'branch_manager') NOT NULL DEFAULT 'branch_manager',
    branch_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
)


CREATE TABLE province (
    province_id INT AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(100) NOT NULL
); 
CREATE TABLE district (
    district_id INT AUTO_INCREMENT PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    province_id INT NOT NULL,
    FOREIGN KEY (province_id) REFERENCES province(province_id)
);

CREATE TABLE branch(
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    remarks VARCHAR(255) NULL,
    district_id INT NOT NULL,
    FOREIGN KEY (district_id) REFERENCES district(district_id)
);


CREATE TABLE services(
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(150),
    description varchar(255),
    service_image varchar(255),
    branch_id INT,
    FOREIGN KEY (branch_id)
    REFERENCES branch(branch_id) 
);


CREATE TABLE inquiry (
    inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    branch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);


CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    aaddress VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role ENUM('staff') NOT NULL DEFAULT 'staff',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    branch_id INT NOT NULL,
    FOREIGN KEY (branch_id)REFERENCES branch(branch_id)
);
