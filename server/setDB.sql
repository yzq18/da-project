CREATE DATABASE IF NOT EXISTS `task_management_system`;

USE `task_management_system`; 
CREATE TABLE IF NOT EXISTS `User` (
    `user_username` VARCHAR(50) NOT NULL PRIMARY KEY,
    `user_password` VARCHAR(255) NOT NULL, 
    `user_email` VARCHAR(100),
    `user_enabled` BOOLEAN NOT NULL DEFAULT 1
); 
INSERT INTO `User` (`user_username`, `user_password`, `user_email`) VALUES ('test', 'ABC@123qq', 
'test@test.com'); 


CREATE TABLE IF NOT EXISTS `User_Group` (
    `user_group_username` VARCHAR(50) NOT NULL,
    `user_group_groupName` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`user_group_username`, `user_group_groupName`)
);
INSERT INTO `User_Group` (`user_group_username`, `user_group_groupName`) VALUES ('test', 'Group1'); 


CREATE TABLE IF NOT EXISTS `Application` (
    `app_acronym` VARCHAR(20) NOT NULL PRIMARY KEY,
    `app_description` VARCHAR(1000),
    `app_rNumber` INT(4),
    `app_startDate` DATE,
    `app_endDate` DATE,
    `App_permit_Create` VARCHAR(50),
    `App_permit_Open` VARCHAR(50),
    `App_permit_toDoList` VARCHAR(50),
    `App_permit_Doing` VARCHAR(50),
    `App_permit_Done` VARCHAR(50)
);
INSERT INTO `Application` (`app_acronym`, `app_description`, `app_rNumber`,
                           `app_startDate`, `app_endDate`, `App_permit_Create`,
                           `App_permit_Open`, `App_permit_toDoList`, 
                           `App_permit_Doing`, `App_permit_Done`) 
VALUES ('APP1', 'Description of application 1', 1001, '2025-01-15', '2025-12-31', 
        'test', 'test', 'test', 'test', 'test');


CREATE TABLE IF NOT EXISTS `Plan` (
    `Plan_MVP_name` VARCHAR(50) NOT NULL,
    `Plan_startDate` DATE,
    `Plan_endDate` DATE,
    `Plan_app_Acronym` VARCHAR(20) NOT NULL,
    `Plan_color` VARCHAR(7),
    PRIMARY KEY (`Plan_MVP_name`, `Plan_app_Acronym`),
    FOREIGN KEY (`Plan_app_Acronym`) REFERENCES `Application`(`app_acronym`)
);
INSERT INTO `Plan` (`Plan_MVP_name`, `Plan_startDate`, `Plan_endDate`,
                    `Plan_app_Acronym`, `Plan_color`) 
VALUES ('Plan1', '2025-01-15', '2025-12-31', 'APP1', '#000000');


CREATE TABLE `Task` (
    `Task_id` VARCHAR(25) NOT NULL PRIMARY KEY,
    `Task_name` VARCHAR(50) NOT NULL,
    `Task_description` TEXT NOT NULL,
    `Task_notes` LONGTEXT,
    `Task_plan` VARCHAR(50),
    `Task_app_Acronym` VARCHAR(20) NOT NULL,
    `Task_state` ENUM ('OPEN', 'TODO', 'DOING', 'DONE', 'CLOSED'),
    `Task_creator` VARCHAR(50) NOT NULL,
    `Task_owner` VARCHAR(50),
    `Task_createDate` DATETIME NOT NULL,
    FOREIGN KEY (`Task_plan`) REFERENCES `Plan`(`Plan_MVP_name`),
    FOREIGN KEY (`Task_app_Acronym`) REFERENCES `Application`(`app_acronym`)
);
INSERT INTO `Task` (`Task_id`, `Task_name`, `Task_description`, `Task_notes`,
                    `Task_plan`, `Task_app_Acronym`, `Task_state`, 
                    `Task_creator`, `Task_owner`, `Task_createDate`) 
VALUES ('TASK001', 'Task Name Example', 'This is a task description.', 
        'These are some task notes.', 'Plan1', 'APP1', 'OPEN',
        'userCreator', 'userOwner', '2025-01-23 10:09:00');
