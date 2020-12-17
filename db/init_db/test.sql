SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE IF NOT EXISTS `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `follower_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_follower_user_1` (`user_id`),
  KEY `fk_follower_user_2` (`follower_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `user_id`, `follower_user_id`) VALUES
(4, 1, 5),
(5, 4, 5),
(6, 2, 4),
(7, 5, 4),
(16, 5, 3),
(22, 5, 2),
(23, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mumur_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_likes_user` (`user_id`),
  KEY `fk_likes_murmur` (`mumur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `mumur_id`, `user_id`) VALUES
(5, 17, 5),
(8, 17, 1),
(15, 34, 2);

-- --------------------------------------------------------

--
-- Table structure for table `murmurs`
--

DROP TABLE IF EXISTS `murmurs`;
CREATE TABLE IF NOT EXISTS `murmurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `murmur_content` text NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_murmur` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `murmurs`
--

INSERT INTO `murmurs` (`id`, `user_id`, `murmur_content`, `creation_date`) VALUES
(2, 1, 'Health care is personal to me — and I’ll always fight to ensure folks like Xiomara are protected and have access to the care they need.', '2020-12-13 01:05:30'),
(3, 2, 'As I said throughout the campaign: I will be a president for all Americans.I will work just as hard for those of you who didn’t vote for me as I will for those who did.', '2020-12-16 01:05:30'),
(4, 1, 'Today, the members of the Electoral College cast their votes for president and vice president.', '2020-12-12 01:05:30'),
(5, 1, 'And once again, the rule of law, our Constitution, and the will of the people have prevailed.', '2020-12-16 01:05:30'),
(6, 4, 'I’m forever humbled by the fact that 5.7 million people chipped in to power our campaign to victory. And to thank everyone', '2020-12-15 01:05:30'),
(7, 2, 'Despite a pandemic, despite all the obstacles, Americans’ voices were heard loud and clear.', '2020-12-13 16:44:09'),
(8, 2, 'It was great hearing from supporters on our thank you call last night and I can’t wait until we’re all together once again.', '2020-12-16 16:45:20'),
(9, 2, 'The Affordable Care Act was there for Elena and her daughter Xiomara when they needed it most—and it can be there for your family too. ', '2020-12-14 16:45:41'),
(10, 4, '“Study: Dominion Machines shifted 2-3% of Trump Votes to Biden. Far more votes than needed to sway election.” Florida, Ohio, Texas and many other states were won by even greater margins than projected. Did just as well with Swing States, but bad things happened', '2020-12-02 16:46:02'),
(11, 4, 'Mo Brooks: ‘Trump Won the Electoral College‘ --- I Can Be a Part of the ‘Surrender Caucus‘ or I Can Fight for Our Country ', '2020-12-01 16:46:34'),
(12, 4, 'Thank you Kevin. Many Trump votes were routed to Biden. The highly respected Michigan Judge released this epic report. True all over the Country. This Fake Election can no longer stand. Get moving Republicans..', '2020-12-14 16:49:00'),
(13, 4, 'This is BIG NEWS. Dominion Voting Machines are a disaster all over the Country. Changed the results of a landslide election. Can’t let this happen. Thank you for the genius, bravery, and patriotism of the Judge. Should get a medal!', '2020-12-16 16:49:29'),
(14, 4, 'Just had a very nice meeting with Attorney General Bill Barr at the White House. Our relationship has been a very good one, he has done an outstanding job! As per letter, Bill will be leaving just before Christmas to spend the holidays with his family', '2020-12-16 16:49:29'),
(15, 2, 'Georgians, today is the first day of early voting – make a plan to vote right now and vote early if you can. Then, make sure your friends and family in Georgia do the same.', '2020-12-01 16:50:18'),
(16, 3, 'Georgia’s runoff election will determine whether the American people have a Senate that’s actually fighting for them. You can get involved right now—make calls, chip in, and do whatever you can to help elect ', '2020-12-02 16:50:18'),
(17, 2, 'Here’s a great way to call voters in Georgia and help them get ready to vote. A couple hours this weekend could help Democrats win the Senate.', '2020-12-12 16:52:00'),
(18, 3, 'Happy Hanukkah to all those celebrating around the world. This year has tested us all, but it is also clarified what really matters. May the lights of the menorah remind us to cherish the blessings we have and offer glimmers of hope. From my family to yours, Chag Sameach!', '2020-12-15 16:52:00'),
(19, 3, 'Bill Foege and Viktor Zdanov are phenomenal examples of what it means to harness science for global health. A well-deserved honor.', '2020-12-16 16:52:59'),
(20, 3, 'Here are five books that I’d recommend as we wrap up 2020. I hope you find something that helps you—or the book lover in your life—finish the year on a good note.\r\n', '2020-12-02 16:52:59'),
(21, 3, 'I believe we can avoid a climate disaster—if we deploy the clean-energy tools we have now wisely, and if we make big breakthroughs that touch every aspect of our physical economy. Creating the National Institutes of Energy Innovation would put us on the right path.', '2020-12-13 16:54:17'),
(22, 3, 'To reduce duplication, focus the government’s efforts, and get the most innovation out of every dollar of funding, we should create a new organization: the National Institutes of Energy Innovation.', '2020-12-09 16:54:17'),
(23, 3, 'We need to revolutionize the world’s physical economy—and that will take, among other things, a dramatic infusion of ingenuity, funding, and focus from the federal government.', '2020-12-10 16:54:41'),
(24, 5, 'This the most important thing the U.S. can do to lead the world in innovations that will solve climate change.\r\n', '2020-12-01 16:54:41'),
(27, 3, 'Today is the 25th anniversary of my first book, The Road Ahead. I made a lot of predictions about technology in the book, and it was fun to look back and see what I got right (and what I got wrong).', '2020-12-14 19:04:31'),
(28, 3, 'In our first podcast episode, Rashida Jones and I talked to Dr. Anthony Fauci about what to expect in the coming months and what the world will look like after COVID-19.\r\n', '2020-12-15 19:05:52'),
(29, 5, 'We may be physically apart during these difficult times, but you’re not alone. Take a few minutes today to reach out to friends and family. We’ll get through this, together.', '2020-12-01 19:14:49'),
(30, 1, 'Congress needs to act now on a COVID relief package. The American people can’t wait.', '2020-12-02 19:14:49'),
(31, 4, 'My first 100 days won’t end COVID-19, but we can slow the spread, save lives, and get back to our lives with our loved ones.', '2020-12-01 19:15:23'),
(32, 3, 'From Housing and Urban Development to Veterans Affairs — this team is where the rubber meets the road, and they’re ready to help the American people build back better. Tune in as I introduce them.', '2020-12-04 19:15:23'),
(34, 2, 'I have worked closely with Secretary-designate Lloyd Austin. He is the definition of duty, honor, and country. I know that under his leadership, the Department of Defense will advance the security of the American people in ways that always honor our highest values and ideals.', '2020-12-05 19:16:26'),
(35, 4, 'Throughout his lifetime of dedicated service, General Austin has demonstrated exemplary leadership, character, and command. Tune in as I introduce my nominee for Secretary of Defense.', '2020-11-30 19:17:12'),
(37, 1, 'This is test..', '2020-12-14 01:05:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(64) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(16) NOT NULL,
  `about_me` varchar(255) NOT NULL,
  `follwers_count` int(11) NOT NULL DEFAULT 0,
  `join_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `full_name`, `email`, `password`, `about_me`, `follwers_count`, `join_date`) VALUES
(1, 'joeBiden', 'Joe Biden', 'JoeBiden@yhaoo.com', '12345', 'President-elect, husband to @DrBiden, proud father & grandfather. Ready to build back better for all Americans.', 0, '2020-12-12 20:14:27'),
(2, 'Kamala Harris', 'Kamala Harris', 'KamalaHarris@yahoo.com', '12345', 'Vice President-Elect of the United States. Senator, Wife, Momala, Auntie. Fighting for the people. She/her.', 0, '2020-12-12 20:14:49'),
(3, 'BillGates', 'Bill Gates', 'user2@yahoo.com', '12345', 'Sharing things I am learning through my foundation work and other interests.\r\n', 0, '2020-12-10 20:14:49'),
(4, 'Trump2', 'Donald Trmup', 'tranump@yahoo.com', '12345', 'Ex president !! 45th President of the United States of America', 0, '2020-12-15 09:43:17'),
(5, 'BarackObama', 'Barack Obama', 'obama@yahoo.com', '12345', 'Dad, husband, President, citizen.', 0, '2020-12-15 09:43:17');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `fk_follower_user_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_follower_user_2` FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_murmur` FOREIGN KEY (`mumur_id`) REFERENCES `murmurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `murmurs`
--
ALTER TABLE `murmurs`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

