-- CREATE TABLE Users (
--     userid INT PRIMARY KEY AUTO_INCREMENT,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     passwordhash VARCHAR(255) NOT NULL,
--     role ENUM('Doctor', 'Patient') NOT NULL,
--     usercreatedate DATETIME DEFAULT CURRENT_TIMESTAMP
-- )


-- create table  Patients (
-- patientid int Primary Key Auto_Increment,
-- userid int,
-- firstname varchar(255) not null,
-- lastname varchar(255) not null,
-- dateofbirth date not null,
-- gender enum ('Male','Female','Other'),
-- contactnumber varchar(15) unique,
-- email varchar(100) unique,
-- address varchar(255),
-- medicalhistory text,
-- disease varchar(255),
-- patientcreateddate datetime DEFAULT CURRENT_Timestamp,
-- role enum('Patient') default 'Patient',
-- age int check(age>0 AND age<120),

-- Foreign Key (userid) references users(userid)
-- );

-- ALTER TABLE patients DROP FOREIGN KEY patients_ibfk_1;

-- ALTER TABLE patients
-- ADD CONSTRAINT patients_ibfk_1
-- FOREIGN KEY (userid)
-- REFERENCES users(userid)
-- ON DELETE CASCADE;


-- create table Doctors (
-- doctorid int Primary Key Auto_Increment,
-- userid int,
-- firstname varchar(255) not null,
-- lastname varchar(255) not null,
-- specialization varchar(100) not null,
-- contactnumber varchar(15) unique,
-- email varchar(100) unique,
-- availaibility varchar(255),
-- age int check (age>0 And age <120),
-- qualification text,
-- previousexperience text,
-- createdat datetime default  Current_timestamp,
-- role varchar(20) check (role = 'Doctor') Default 'Doctor',
-- photo text,
-- Foreign Key (userid) references users(userid)
-- );

-- ALTER TABLE doctors DROP FOREIGN KEY doctors_ibfk_1;

-- ALTER TABLE doctors
-- ADD CONSTRAINT doctors_ibfk_1
-- FOREIGN KEY (userid)
-- REFERENCES users(userid)
-- ON DELETE CASCADE;

-- alter table patients
-- drop column dateofbirth


-- create table appointments (
-- appointmentid int Primary Key auto_increment,
-- patientid int,
-- doctorid int,
-- appointmentdate datetime not null,
-- appointmentstatus varchar(20) check(appointmentstatus in
--  ('Scheduled' , 'Completed' , 'Cancelled' , 'Rescheduled' )),
--  notes text,
--  appointmentmadedate datetime default current_timestamp,
--  foreign key(patientid) references patients(patientid)
--  on delete cascade
--  on update no action, 
--  foreign key (doctorid) references doctors(doctorid)
--  on delete cascade
--  on update no action
-- );

-- create table medicalrecords (

-- recordid int Primary Key auto_increment,
-- patientid int ,
-- doctorid int,
-- diagonisis text,
-- prescriptions text,
-- testresults text,
-- treatment text,
-- bloodpressure varchar(20),
-- bloodsugar varchar(20),
-- heartrate int,
-- temperature decimal(5,2),
-- respiratoryrate int,
-- oxygensaturation decimal(5,2),
-- recorddate datetime default current_timestamp,

-- foreign key (patientid) references patients(patientid),
-- foreign key(doctorid) references doctors(doctorid)
-- );

-- CREATE TABLE Feedback (
--     feedbackid INT AUTO_INCREMENT PRIMARY KEY,
--     patientid INT,
--     doctorid INT,
--     rating INT CHECK (rating BETWEEN 1 AND 5),
--     comments TEXT,
--     feedbackpostdate DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (patientID) REFERENCES Patients(patientID),
--     FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID)
-- );

-- INSERT INTO Users (username, passwordhash, role) VALUES
-- -- Doctors
-- ('dr_smith',    'hashed_password1',   'Doctor'),
-- ('dr_johnson',  'hashed_password2',   'Doctor'),
-- ('dr_williams', 'hashed_password3',   'Doctor'),
-- ('dr_brown',    'hashed_password4',   'Doctor'),
-- ('dr_jones',    'hashed_password5',   'Doctor'),
-- ('dr_miller',   'hashed_password6',   'Doctor'),
-- ('dr_davis',    'hashed_password7',   'Doctor'),
-- ('dr_garcia',   'hashed_password8',   'Doctor'),
-- ('dr_rodriguez','hashed_password9',   'Doctor'),
-- ('dr_martinez', 'hashed_password10',  'Doctor'),
-- ('dr_hernandez','hashed_password11',  'Doctor'),
-- ('dr_lopez',    'hashed_password12',  'Doctor'),
-- ('dr_gonzalez', 'hashed_password13',  'Doctor'),
-- ('dr_wilson',   'hashed_password14',  'Doctor'),
-- ('dr_anderson', 'hashed_password15',  'Doctor'),
-- ('dr_thomas',   'hashed_password16',  'Doctor'),
-- ('dr_taylor',   'hashed_password17',  'Doctor'),
-- ('dr_moore',    'hashed_password18',  'Doctor'),
-- ('dr_jackson',  'hashed_password19',  'Doctor'),
-- ('dr_martin',   'hashed_password20',  'Doctor'),
-- ('dr_lee',      'hashed_password21',  'Doctor'),
-- ('dr_perez',    'hashed_password22',  'Doctor'),
-- ('dr_thompson', 'hashed_password23',  'Doctor'),
-- ('dr_white',    'hashed_password24',  'Doctor'),
-- -- Patients (IDs 26–30)
-- ('patient1',    'hashed_pw1',         'Patient'),
-- ('patient2',    'hashed_pw2',         'Patient'),
-- ('patient3',    'hashed_pw3',         'Patient'),
-- ('patient4',    'hashed_pw4',         'Patient'),
-- ('patient5',    'hashed_pw5',         'Patient');


-- INSERT INTO Patients (userid, firstname, lastname, dateofbirth, gender, contactnumber, email, address, medicalhistory, disease, age) VALUES
-- (25, 'Sarah',    'Connor',   '1978-08-20', 'Female', '2345678901', 'sarah.c@email.com',    '456 Oak Ave',     'Family history of neurological disorders', 'Migraine', 46),
-- (26, 'Emily',    'Rose',     '1992-11-25', 'Female', '4567890123', 'emily.r@email.com',     '321 Elm St',       'Chronic digestive issues',               'IBS',      32),
-- (27, 'Robert',   'Johnson',  '1956-04-22', 'Male',   '7890123456', 'robert.j@email.com',    '159 Oak St',       'Previous hip replacement',              'Osteoarthritis', 68),
-- (28, 'Elizabeth','Hernandez','1978-04-03', 'Female', '5566778899', 'elizabeth.h@email.com', '951 Cedar Ln',      'Childhood history',                    'Asthma',   46),
-- (29, 'Laura',    'Taylor',   '1968-07-12', 'Female', '1213141516', 'laura.t@email.com',     '357 Oak Ln',       'Age-related hearing decline',           'Hearing Loss', 56);


-- INSERT INTO Doctors (userid, firstname, lastname, specialization, contactnumber, email, availaibility, age, qualification, previousexperience, photo) VALUES
-- -- Neurologists
-- (1,  'David',     'Smith',     'Neurologist',   '1112223333', 'dr.smith@neuro.com',     'Mon-Wed 9am-5pm',                  45, 'MD, Neurology',             '10 years at City Hospital',           'neurologist1.jpg'),
-- (2,  'Sarah',     'Johnson',   'Neurologist',   '2223334444', 'dr.johnson@neuro.com',   'Tue-Thu 10am-6pm',                 52, 'PhD, Neuroscience',         '15 years at Regional Medical',        'neurologist2.jpg'),
-- (3,  'James',     'Williams',  'Neurologist',   '3334445555', 'dr.williams@neuro.com',  'Fri-Sun 8am-4pm',                 38, 'MD, Neurology',             '5 years at University Hospital',      'neurologist3.jpg'),
-- -- Gastroenterologists
-- (4,  'Robert',    'Brown',     'Gastroenterologist', '4445556666', 'dr.brown@gastro.com', 'Mon-Fri 8am-3pm',                 47, 'MD, Gastroenterology',      '12 years at Digestive Health',        'gastro1.jpg'),
-- (5,  'Jennifer',  'Jones',     'Gastroenterologist', '5556667777', 'dr.jones@gastro.com','Wed-Sat 9am-5pm',                 41, 'MD, Internal Medicine',     '8 years at GI Associates',            'gastro2.jpg'),
-- (6,  'Thomas',    'Miller',    'Gastroenterologist', '6667778888', 'dr.miller@gastro.com','Tue-Thu 7am-2pm',                 56, 'PhD, Gastroenterology',     '20 years at Medical Center',          'gastro3.jpg'),
-- -- Orthopedic
-- (7,  'Richard',   'Davis',     'Orthopedic',    '7778889999', 'dr.davis@ortho.com',     'Mon-Wed-Fri 8am-5pm',              49, 'MD, Orthopedic Surgery',    '14 years at Bone & Joint',            'ortho1.jpg'),
-- (8,  'Patricia',  'Garcia',    'Orthopedic',    '8889990000', 'dr.garcia@ortho.com',    'Tue-Thu 10am-7pm',                 43, 'MD, Sports Medicine',       '9 years at Sports Clinic',            'ortho2.jpg'),
-- (9,  'Daniel',    'Rodriguez', 'Orthopedic',    '9990001111', 'dr.rodriguez@ortho.com', 'Sat-Sun 9am-4pm',                  37, 'MD, Orthopedics',           '6 years at Regional Hospital',        'ortho3.jpg'),
-- -- Dermatologists
-- (10, 'Lisa',      'Martinez',  'Dermatologist', '1112223334', 'dr.martinez@derm.com',   'Mon-Tue-Thu 9am-6pm',             44, 'MD, Dermatology',          '11 years at Skin Care Center',        'derm1.jpg'),
-- (11, 'Paul',      'Hernandez', 'Dermatologist', '2223334445', 'dr.hernandez@derm.com',  'Wed-Fri-Sat 10am-7pm',            50, 'MD, Cosmetic Dermatology', '16 years at Dermatology Associates',  'derm2.jpg'),
-- (12, 'Amanda',    'Lopez',     'Dermatologist', '3334445556', 'dr.lopez@derm.com',      'Mon-Wed-Fri 8am-4pm',             39, 'MD, Dermatology',          '7 years at Skin Health',              'derm3.jpg'),
-- -- Pulmonologists
-- (13, 'Kevin',     'Gonzalez',  'Pulmonologist', '4445556667', 'dr.gonzalez@pulmo.com',  'Tue-Thu 8am-5pm',                 48, 'MD, Pulmonology',          '13 years at Lung Center',             'pulmo1.jpg'),
-- (14, 'Nancy',     'Wilson',    'Pulmonologist', '5556667778', 'dr.wilson@pulmo.com',    'Mon-Wed-Fri 9am-6pm',             45, 'MD, Respiratory Medicine', '12 years at Chest Specialists',       'pulmo2.jpg'),
-- (15, 'Steven',    'Anderson',  'Pulmonologist', '6667778889', 'dr.anderson@pulmo.com',  'Sat-Sun 10am-5pm',                42, 'MD, Pulmonology',          '9 years at Respiratory Health',       'pulmo3.jpg'),
-- -- Eye Specialists
-- (16, 'Jessica',   'Thomas',    'Eye Specialist','7778889990', 'dr.thomas@eye.com',      'Mon-Tue-Wed 8am-4pm',             47, 'MD, Ophthalmology',        '14 years at Vision Center',           'eye1.jpg'),
-- (17, 'Charles',   'Taylor',    'Eye Specialist','8889990001', 'dr.taylor@eye.com',      'Thu-Fri-Sat 9am-6pm',             53, 'MD, Ophthalmology',        '18 years at Eye Care',                'eye2.jpg'),
-- (18, 'Karen',     'Moore',     'Eye Specialist','9990001112', 'dr.moore@eye.com',       'Mon-Wed-Fri 10am-7pm',            40, 'MD, Ophthalmology',        '8 years at Sight Specialists',        'eye3.jpg'),
-- -- ENT Specialists
-- (19, 'Matthew',   'Jackson',   'ENT Specialist','1112223335', 'dr.jackson@ent.com',     'Tue-Thu 8am-5pm',                 46, 'MD, Otolaryngology',       '12 years at Ear Nose Throat Center', 'ent1.jpg'),
-- (20, 'Angela',    'Martin',    'ENT Specialist','2223334446', 'dr.martin@ent.com',      'Mon-Wed-Fri 9am-6pm',             44, 'MD, ENT Surgery',          '11 years at ENT Associates',          'ent2.jpg'),
-- (21, 'Ryan',      'Lee',       'ENT Specialist','3334445557', 'dr.lee@ent.com',         'Sat-Sun 10am-5pm',                38, 'MD, Otolaryngology',       '7 years at Hearing Center',           'ent3.jpg'),
-- -- Psychiatrists
-- (22, 'Michelle',  'Perez',     'Psychiatrist', '4445556668', 'dr.perez@psych.com',     'Mon-Tue-Thu 10am-7pm',            45, 'MD, Psychiatry',          '13 years at Mental Health Center',   'psych1.jpg'),
-- (23, 'Jason',     'Thompson',  'Psychiatrist', '5556667779', 'dr.thompson@psych.com',  'Wed-Fri-Sat 9am-6pm',             50, 'MD, Psychology',          '17 years at Behavioral Health',       'psych2.jpg'),
-- (24, 'Rebecca',   'White',     'Psychiatrist', '6667778880', 'dr.white@psych.com',     'Mon-Wed-Fri 8am-4pm',             42, 'MD, Psychiatry',          '9 years at Wellness Clinic',          'psych3.jpg');

-- INSERT INTO Appointments (patientid, doctorid, appointmentdate, appointmentstatus, notes) VALUES
-- -- Neurologist appointments
-- (1, 2, '2023-06-15 10:00:00', 'Completed', 'Migraine treatment follow-up'),
-- (1, 2, '2023-07-20 14:00:00', 'Scheduled', 'Migraine medication review'),
-- -- Gastroenterologist appointments
-- (2, 4, '2023-06-18 09:30:00', 'Completed', 'IBS dietary consultation'),
-- (2, 5, '2023-07-25 11:15:00', 'Scheduled', 'IBS follow-up'),
-- -- Orthopedic appointments
-- (3, 7, '2023-06-22 13:45:00', 'Completed', 'Knee pain evaluation'),
-- (3, 8, '2023-07-28 15:30:00', 'Scheduled', 'Physical therapy follow-up'),
-- -- Pulmonologist appointments
-- (4, 14, '2023-06-25 11:00:00', 'Completed', 'Asthma control check'),
-- (4, 14, '2023-08-05 10:30:00', 'Scheduled', 'Asthma medication review'),
-- -- ENT appointments
-- (5, 20, '2023-06-30 14:45:00', 'Completed', 'Hearing test results'),
-- (5, 20, '2023-08-10 09:15:00', 'Scheduled', 'Hearing aid fitting');


-- INSERT INTO MedicalRecords (patientid, doctorid, diagonisis, prescriptions, testresults, treatment, bloodpressure, bloodsugar, heartrate, temperature, respiratoryrate, oxygensaturation) VALUES
-- (1, 2,  'Chronic migraine with aura', 'Rimegepant 75mg as needed', 'MRI normal', 'Lifestyle modifications', '118/76', '94', 72, 98.6, 14, 98.5),
-- (2, 4,  'Irritable Bowel Syndrome - diarrhea predominant', 'Dicyclomine 20mg before meals', 'Colonoscopy normal', 'Low FODMAP diet', '122/78', '96', 70, 98.5, 15, 98.2),
-- (3, 7,  'Osteoarthritis - bilateral knees', 'Acetaminophen 1000mg every 6 hours', 'X-ray shows joint degeneration', 'Physical therapy plan', '130/85','102', 76, 98.4, 18, 97.5),
-- (4, 14, 'Asthma - moderate persistent', 'Fluticasone/salmeterol 250/50 twice daily', 'FEV1 improved with bronchodilator', 'Step-up therapy', '118/76', '95', 76, 98.4, 18, 96.8),
-- (5, 20, 'Sensorineural hearing loss', 'None', 'Audiogram shows 40dB loss', 'Hearing aid recommendation', '124/80', '99', 68, 98.4, 14, 98.5);


-- INSERT INTO Feedback (patientid, doctorid, rating, comments) VALUES
-- (1, 2, 5, 'Dr. Johnson was extremely thorough in explaining my migraine treatment options. Her approach has significantly reduced my symptoms.'),
-- (2, 4, 4, 'Dr. Brown provided excellent dietary advice for my IBS. The only reason for 4 stars is the long wait time before my appointment.'),
-- (3, 7, 5, 'Dr. Davis gave me clear explanations about my knee osteoarthritis and a realistic treatment plan. Very professional.'),
-- (4, 14, 3, 'My asthma is better controlled but I felt rushed during the appointment. The treatment is working though.'),
-- (5, 20, 5, 'Dr. Martin was patient and explained my hearing test results in detail. The hearing aid recommendation has improved my quality of life.');


-- CREATE TABLE checkupinfo (
--     recordid INT PRIMARY KEY AUTO_INCREMENT,
--     patientid INT NOT NULL,
--     doctorid INT,
--     diagonisis TEXT,
--     prescriptions TEXT,
--     testresults TEXT,
--     treatment TEXT,
--     bloodpressure VARCHAR(20),
--     bloodsugar VARCHAR(20),
--     heartrate INT,
--     temperature DECIMAL(5,2),
--     respiratoryrate INT,
--     oxygensaturation DECIMAL(5,2),
--     recorddate DATETIME DEFAULT CURRENT_TIMESTAMP,
--     medicine1 VARCHAR(255),
--     medicine2 VARCHAR(255),
--     medicine3 VARCHAR(255),
--     dosage1 VARCHAR(255),
--     dosage2 VARCHAR(255),
--     dosage3 VARCHAR(255),
--     duration1 VARCHAR(255),
--     duration2 VARCHAR(255),
--     duration3 VARCHAR(255),
--     FOREIGN KEY (patientid) REFERENCES patients(patientid) ON DELETE CASCADE,
--     FOREIGN KEY (doctorid) REFERENCES doctors(doctorid) ON DELETE SET NULL
-- );



