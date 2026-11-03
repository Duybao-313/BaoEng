-- Seed curriculum: 12 topics / 37 lessons (video dung chung cua Lesson 1)
-- Chay lai duoc: xoa cac topic cung ten cua teacher_id = 1 truoc khi insert.
SET NAMES utf8mb4;

DELETE FROM topics WHERE teacher_id = 1 AND title IN ('Greetings & Introductions (Chào hỏi & Giới thiệu)', 'Daily Routines (Sinh hoạt hằng ngày)', 'Past Simple (Thì quá khứ đơn)', 'Food & Drink (Đồ ăn & Thức uống)', 'Past Continuous (Thì quá khứ tiếp diễn)', 'Present Perfect vs Past Simple (Hiện tại hoàn thành & Quá khứ đơn)', 'Work & Career (Công việc & Sự nghiệp)', 'Travel & Culture (Du lịch & Văn hóa)', 'Past Perfect (Thì quá khứ hoàn thành)', 'Past Perfect Continuous (Thì quá khứ hoàn thành tiếp diễn)', 'Environment & Society (Môi trường & Xã hội)', 'Business English & Negotiation (Tiếng Anh thương mại & Đàm phán)');

-- ==============================================================================
-- TOPIC: Greetings & Introductions (Chào hỏi & Giới thiệu) [BEGINNER]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Greetings & Introductions (Chào hỏi & Giới thiệu)', 'Chào hỏi, giới thiệu bản thân và đặt câu hỏi cơ bản trong giao tiếp hằng ngày.', 'BEGINNER', 'PUBLISHED', NOW() - INTERVAL 0 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Hello & Goodbye (Chào hỏi cơ bản)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Hello & Goodbye (Chào hỏi cơ bản)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'hello', 'xin chào', '/həˈloʊ/', 'Hello! Nice to meet you.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'goodbye', 'tạm biệt', '/ɡʊdˈbaɪ/', 'Goodbye, see you tomorrow.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'morning', 'buổi sáng', '/ˈmɔːr.nɪŋ/', 'Good morning, everyone!');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'name', 'tên', '/neɪm/', 'My name is Lan.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'friend', 'bạn bè', '/frend/', 'She is my best friend.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'fine', 'khỏe, ổn', '/faɪn/', 'I''m fine, thank you.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Hello & Goodbye (Chào hỏi cơ bản)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘hello’ là gì?', 'MULTIPLE_CHOICE', 'khỏe, ổn', 'xin chào', 'tên', 'bạn bè', 'B', 'Từ “hello” có nghĩa là: xin chào.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘goodbye’ là gì?', 'MULTIPLE_CHOICE', 'khỏe, ổn', 'tạm biệt', 'bạn bè', 'buổi sáng', 'B', 'Từ “goodbye” có nghĩa là: tạm biệt.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘morning’ là gì?', 'MULTIPLE_CHOICE', 'buổi sáng', 'xin chào', 'khỏe, ổn', 'bạn bè', 'A', 'Từ “morning” có nghĩa là: buổi sáng.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘name’ là gì?', 'MULTIPLE_CHOICE', 'buổi sáng', 'khỏe, ổn', 'xin chào', 'tên', 'D', 'Từ “name” có nghĩa là: tên.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘friend’ là gì?', 'MULTIPLE_CHOICE', 'buổi sáng', 'bạn bè', 'khỏe, ổn', 'xin chào', 'B', 'Từ “friend” có nghĩa là: bạn bè.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘fine’ là gì?', 'MULTIPLE_CHOICE', 'bạn bè', 'khỏe, ổn', 'tạm biệt', 'buổi sáng', 'B', 'Từ “fine” có nghĩa là: khỏe, ổn.', 'EASY', 6, 1);

-- Lesson 2: Introducing Yourself (Giới thiệu bản thân)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Introducing Yourself (Giới thiệu bản thân)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'introduce', 'giới thiệu', '/ˌɪn.trəˈduːs/', 'Let me introduce myself.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'country', 'quốc gia', '/ˈkʌn.tri/', 'Which country are you from?');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'live', 'sống', '/lɪv/', 'I live in Ho Chi Minh City.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'student', 'học sinh, sinh viên', '/ˈstuː.dənt/', 'I am a student at this university.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'hobby', 'sở thích', '/ˈhɑː.bi/', 'My hobby is playing football.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'language', 'ngôn ngữ', '/ˈlæŋ.ɡwɪdʒ/', 'English is a global language.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Introducing Yourself (Giới thiệu bản thân)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘introduce’ là gì?', 'MULTIPLE_CHOICE', 'sở thích', 'học sinh, sinh viên', 'giới thiệu', 'sống', 'C', 'Từ “introduce” có nghĩa là: giới thiệu.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘country’ là gì?', 'MULTIPLE_CHOICE', 'ngôn ngữ', 'quốc gia', 'học sinh, sinh viên', 'sống', 'B', 'Từ “country” có nghĩa là: quốc gia.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘live’ là gì?', 'MULTIPLE_CHOICE', 'quốc gia', 'sống', 'học sinh, sinh viên', 'ngôn ngữ', 'B', 'Từ “live” có nghĩa là: sống.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘student’ là gì?', 'MULTIPLE_CHOICE', 'sở thích', 'giới thiệu', 'học sinh, sinh viên', 'ngôn ngữ', 'C', 'Từ “student” có nghĩa là: học sinh, sinh viên.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘hobby’ là gì?', 'MULTIPLE_CHOICE', 'sở thích', 'học sinh, sinh viên', 'quốc gia', 'ngôn ngữ', 'A', 'Từ “hobby” có nghĩa là: sở thích.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘language’ là gì?', 'MULTIPLE_CHOICE', 'sở thích', 'giới thiệu', 'ngôn ngữ', 'quốc gia', 'C', 'Từ “language” có nghĩa là: ngôn ngữ.', 'EASY', 6, 1);

-- Lesson 3: Asking Simple Questions (Đặt câu hỏi đơn giản)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Asking Simple Questions (Đặt câu hỏi đơn giản)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'what', 'cái gì', '/wʌt/', 'What is your name?');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'where', 'ở đâu', '/wer/', 'Where do you live?');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'who', 'ai', '/huː/', 'Who is your teacher?');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'how', 'như thế nào', '/haʊ/', 'How are you today?');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'question', 'câu hỏi', '/ˈkwes.tʃən/', 'Can I ask a question?');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'answer', 'câu trả lời', '/ˈæn.sɚ/', 'Please answer the question.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Asking Simple Questions (Đặt câu hỏi đơn giản)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘what’ là gì?', 'MULTIPLE_CHOICE', 'cái gì', 'ai', 'câu hỏi', 'câu trả lời', 'A', 'Từ “what” có nghĩa là: cái gì.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘where’ là gì?', 'MULTIPLE_CHOICE', 'ai', 'cái gì', 'ở đâu', 'câu hỏi', 'C', 'Từ “where” có nghĩa là: ở đâu.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘who’ là gì?', 'MULTIPLE_CHOICE', 'ai', 'ở đâu', 'cái gì', 'câu hỏi', 'A', 'Từ “who” có nghĩa là: ai.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘how’ là gì?', 'MULTIPLE_CHOICE', 'ở đâu', 'như thế nào', 'cái gì', 'câu hỏi', 'B', 'Từ “how” có nghĩa là: như thế nào.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘question’ là gì?', 'MULTIPLE_CHOICE', 'cái gì', 'ở đâu', 'câu hỏi', 'câu trả lời', 'C', 'Từ “question” có nghĩa là: câu hỏi.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘answer’ là gì?', 'MULTIPLE_CHOICE', 'câu hỏi', 'cái gì', 'ai', 'câu trả lời', 'D', 'Từ “answer” có nghĩa là: câu trả lời.', 'EASY', 6, 1);

-- ==============================================================================
-- TOPIC: Daily Routines (Sinh hoạt hằng ngày) [BEGINNER]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Daily Routines (Sinh hoạt hằng ngày)', 'Thì hiện tại đơn qua thói quen hằng ngày, cách nói giờ và trạng từ tần suất.', 'BEGINNER', 'PUBLISHED', NOW() - INTERVAL 1 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: My Day (Một ngày của tôi)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'My Day (Một ngày của tôi)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'wake up', 'thức dậy', '/weɪk ʌp/', 'I wake up at six o''clock.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'breakfast', 'bữa sáng', '/ˈbrek.fəst/', 'I have breakfast with my family.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'work', 'làm việc', '/wɝːk/', 'I work from nine to five.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'lunch', 'bữa trưa', '/lʌntʃ/', 'We have lunch at noon.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'evening', 'buổi tối', '/ˈiːv.nɪŋ/', 'I study English in the evening.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'sleep', 'ngủ', '/sliːp/', 'I sleep eight hours every night.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – My Day (Một ngày của tôi)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘wake up’ là gì?', 'MULTIPLE_CHOICE', 'thức dậy', 'làm việc', 'bữa trưa', 'ngủ', 'A', 'Từ “wake up” có nghĩa là: thức dậy.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘breakfast’ là gì?', 'MULTIPLE_CHOICE', 'buổi tối', 'làm việc', 'bữa sáng', 'bữa trưa', 'C', 'Từ “breakfast” có nghĩa là: bữa sáng.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘work’ là gì?', 'MULTIPLE_CHOICE', 'bữa sáng', 'bữa trưa', 'buổi tối', 'làm việc', 'D', 'Từ “work” có nghĩa là: làm việc.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘lunch’ là gì?', 'MULTIPLE_CHOICE', 'làm việc', 'bữa trưa', 'bữa sáng', 'thức dậy', 'B', 'Từ “lunch” có nghĩa là: bữa trưa.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘evening’ là gì?', 'MULTIPLE_CHOICE', 'thức dậy', 'buổi tối', 'làm việc', 'ngủ', 'B', 'Từ “evening” có nghĩa là: buổi tối.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘sleep’ là gì?', 'MULTIPLE_CHOICE', 'bữa sáng', 'ngủ', 'bữa trưa', 'làm việc', 'B', 'Từ “sleep” có nghĩa là: ngủ.', 'EASY', 6, 1);

-- Lesson 2: Telling the Time (Nói giờ)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Telling the Time (Nói giờ)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'hour', 'giờ', '/aʊr/', 'The class lasts two hours.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'minute', 'phút', '/ˈmɪn.ɪt/', 'Wait five minutes, please.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'o''clock', 'đúng giờ', '/əˈklɑːk/', 'The meeting starts at nine o''clock.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'early', 'sớm', '/ˈɝː.li/', 'I get up early every day.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'late', 'muộn', '/leɪt/', 'Don''t be late for class.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'schedule', 'lịch trình', '/ˈskedʒ.uːl/', 'My schedule is very busy.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Telling the Time (Nói giờ)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘hour’ là gì?', 'MULTIPLE_CHOICE', 'giờ', 'muộn', 'lịch trình', 'đúng giờ', 'A', 'Từ “hour” có nghĩa là: giờ.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘minute’ là gì?', 'MULTIPLE_CHOICE', 'sớm', 'phút', 'đúng giờ', 'muộn', 'B', 'Từ “minute” có nghĩa là: phút.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘o''clock’ là gì?', 'MULTIPLE_CHOICE', 'đúng giờ', 'muộn', 'phút', 'sớm', 'A', 'Từ “o''clock” có nghĩa là: đúng giờ.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘early’ là gì?', 'MULTIPLE_CHOICE', 'sớm', 'lịch trình', 'giờ', 'muộn', 'A', 'Từ “early” có nghĩa là: sớm.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘late’ là gì?', 'MULTIPLE_CHOICE', 'muộn', 'đúng giờ', 'phút', 'sớm', 'A', 'Từ “late” có nghĩa là: muộn.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘schedule’ là gì?', 'MULTIPLE_CHOICE', 'muộn', 'giờ', 'đúng giờ', 'lịch trình', 'D', 'Từ “schedule” có nghĩa là: lịch trình.', 'EASY', 6, 1);

-- Lesson 3: Adverbs of Frequency (Trạng từ tần suất)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Adverbs of Frequency (Trạng từ tần suất)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'always', 'luôn luôn', '/ˈɔːl.weɪz/', 'She always drinks coffee in the morning.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'usually', 'thường xuyên', '/ˈjuː.ʒu.ə.li/', 'I usually walk to school.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'often', 'thường', '/ˈɑːf.ən/', 'We often play tennis on Sundays.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'sometimes', 'thỉnh thoảng', '/ˈsʌm.taɪmz/', 'He sometimes cooks dinner.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'rarely', 'hiếm khi', '/ˈrer.li/', 'They rarely watch television.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'never', 'không bao giờ', '/ˈnev.ɚ/', 'I never eat fast food.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Adverbs of Frequency (Trạng từ tần suất)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘always’ là gì?', 'MULTIPLE_CHOICE', 'thường', 'thường xuyên', 'không bao giờ', 'luôn luôn', 'D', 'Từ “always” có nghĩa là: luôn luôn.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘usually’ là gì?', 'MULTIPLE_CHOICE', 'thường xuyên', 'thường', 'hiếm khi', 'không bao giờ', 'A', 'Từ “usually” có nghĩa là: thường xuyên.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘often’ là gì?', 'MULTIPLE_CHOICE', 'hiếm khi', 'thường xuyên', 'không bao giờ', 'thường', 'D', 'Từ “often” có nghĩa là: thường.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘sometimes’ là gì?', 'MULTIPLE_CHOICE', 'thỉnh thoảng', 'luôn luôn', 'thường', 'không bao giờ', 'A', 'Từ “sometimes” có nghĩa là: thỉnh thoảng.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘rarely’ là gì?', 'MULTIPLE_CHOICE', 'luôn luôn', 'hiếm khi', 'thỉnh thoảng', 'thường', 'B', 'Từ “rarely” có nghĩa là: hiếm khi.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘never’ là gì?', 'MULTIPLE_CHOICE', 'thường xuyên', 'hiếm khi', 'luôn luôn', 'không bao giờ', 'D', 'Từ “never” có nghĩa là: không bao giờ.', 'EASY', 6, 1);

-- ==============================================================================
-- TOPIC: Past Simple (Thì quá khứ đơn) [BEGINNER]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Past Simple (Thì quá khứ đơn)', 'Nắm vững thì quá khứ đơn: động từ to be, động từ có quy tắc, bất quy tắc, câu hỏi và phủ định.', 'BEGINNER', 'PUBLISHED', NOW() - INTERVAL 2 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Was / Were (Động từ to be ở quá khứ)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Was / Were (Động từ to be ở quá khứ)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'was', 'đã là (số ít)', '/wʌz/', 'I was tired yesterday.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'were', 'đã là (số nhiều)', '/wɝː/', 'They were at home last night.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'yesterday', 'hôm qua', '/ˈjes.tɚ.deɪ/', 'She called me yesterday.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'last night', 'đêm qua', '/læst naɪt/', 'We watched a film last night.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ago', 'trước đây', '/əˈɡoʊ/', 'He left two hours ago.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'born', 'được sinh ra', '/bɔːrn/', 'I was born in Hanoi.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Was / Were (Động từ to be ở quá khứ)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘was’ là gì?', 'MULTIPLE_CHOICE', 'được sinh ra', 'trước đây', 'đã là (số nhiều)', 'đã là (số ít)', 'D', 'Từ “was” có nghĩa là: đã là (số ít).', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘were’ là gì?', 'MULTIPLE_CHOICE', 'đã là (số ít)', 'trước đây', 'hôm qua', 'đã là (số nhiều)', 'D', 'Từ “were” có nghĩa là: đã là (số nhiều).', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘yesterday’ là gì?', 'MULTIPLE_CHOICE', 'đêm qua', 'hôm qua', 'đã là (số nhiều)', 'đã là (số ít)', 'B', 'Từ “yesterday” có nghĩa là: hôm qua.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘last night’ là gì?', 'MULTIPLE_CHOICE', 'trước đây', 'đã là (số nhiều)', 'đã là (số ít)', 'đêm qua', 'D', 'Từ “last night” có nghĩa là: đêm qua.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘ago’ là gì?', 'MULTIPLE_CHOICE', 'trước đây', 'đã là (số nhiều)', 'hôm qua', 'đêm qua', 'A', 'Từ “ago” có nghĩa là: trước đây.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘born’ là gì?', 'MULTIPLE_CHOICE', 'đã là (số nhiều)', 'đêm qua', 'được sinh ra', 'đã là (số ít)', 'C', 'Từ “born” có nghĩa là: được sinh ra.', 'EASY', 6, 1);

-- Lesson 2: Regular Verbs (Động từ có quy tắc với -ed)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Regular Verbs (Động từ có quy tắc với -ed)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'played', 'đã chơi', '/pleɪd/', 'The children played football yesterday.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'watched', 'đã xem', '/wɑːtʃt/', 'We watched a movie last weekend.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'visited', 'đã thăm', '/ˈvɪz.ɪ.tɪd/', 'She visited her grandparents.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'studied', 'đã học', '/ˈstʌd.id/', 'I studied English for two hours.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'worked', 'đã làm việc', '/wɝːkt/', 'He worked late last night.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'cleaned', 'đã dọn dẹp', '/kliːnd/', 'They cleaned the house together.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Regular Verbs (Động từ có quy tắc với -ed)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘played’ là gì?', 'MULTIPLE_CHOICE', 'đã xem', 'đã chơi', 'đã dọn dẹp', 'đã làm việc', 'B', 'Từ “played” có nghĩa là: đã chơi.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘watched’ là gì?', 'MULTIPLE_CHOICE', 'đã xem', 'đã chơi', 'đã làm việc', 'đã học', 'A', 'Từ “watched” có nghĩa là: đã xem.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘visited’ là gì?', 'MULTIPLE_CHOICE', 'đã thăm', 'đã học', 'đã làm việc', 'đã xem', 'A', 'Từ “visited” có nghĩa là: đã thăm.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘studied’ là gì?', 'MULTIPLE_CHOICE', 'đã dọn dẹp', 'đã học', 'đã làm việc', 'đã xem', 'B', 'Từ “studied” có nghĩa là: đã học.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘worked’ là gì?', 'MULTIPLE_CHOICE', 'đã chơi', 'đã xem', 'đã làm việc', 'đã thăm', 'C', 'Từ “worked” có nghĩa là: đã làm việc.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘cleaned’ là gì?', 'MULTIPLE_CHOICE', 'đã làm việc', 'đã dọn dẹp', 'đã chơi', 'đã học', 'B', 'Từ “cleaned” có nghĩa là: đã dọn dẹp.', 'EASY', 6, 1);

-- Lesson 3: Irregular Verbs (Động từ bất quy tắc)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Irregular Verbs (Động từ bất quy tắc)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'went', 'đã đi', '/went/', 'We went to the beach last summer.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ate', 'đã ăn', '/eɪt/', 'I ate noodles for breakfast.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'saw', 'đã thấy', '/sɔː/', 'She saw a rainbow yesterday.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'bought', 'đã mua', '/bɔːt/', 'He bought a new phone.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'wrote', 'đã viết', '/roʊt/', 'They wrote a letter to the teacher.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'met', 'đã gặp', '/met/', 'I met my old friend at the market.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Irregular Verbs (Động từ bất quy tắc)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘went’ là gì?', 'MULTIPLE_CHOICE', 'đã thấy', 'đã đi', 'đã ăn', 'đã mua', 'B', 'Từ “went” có nghĩa là: đã đi.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘ate’ là gì?', 'MULTIPLE_CHOICE', 'đã gặp', 'đã ăn', 'đã thấy', 'đã mua', 'B', 'Từ “ate” có nghĩa là: đã ăn.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘saw’ là gì?', 'MULTIPLE_CHOICE', 'đã mua', 'đã viết', 'đã gặp', 'đã thấy', 'D', 'Từ “saw” có nghĩa là: đã thấy.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘bought’ là gì?', 'MULTIPLE_CHOICE', 'đã viết', 'đã đi', 'đã thấy', 'đã mua', 'D', 'Từ “bought” có nghĩa là: đã mua.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘wrote’ là gì?', 'MULTIPLE_CHOICE', 'đã thấy', 'đã ăn', 'đã viết', 'đã đi', 'C', 'Từ “wrote” có nghĩa là: đã viết.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘met’ là gì?', 'MULTIPLE_CHOICE', 'đã thấy', 'đã viết', 'đã gặp', 'đã mua', 'C', 'Từ “met” có nghĩa là: đã gặp.', 'EASY', 6, 1);

-- Lesson 4: Past Simple Questions & Negatives (Câu hỏi và phủ định)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Past Simple Questions & Negatives (Câu hỏi và phủ định)', 4, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'did', 'đã (trợ động từ)', '/dɪd/', 'Did you finish your homework?');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'didn''t', 'đã không', '/ˈdɪd.ənt/', 'I didn''t see him yesterday.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'last week', 'tuần trước', '/læst wiːk/', 'They travelled to Da Nang last week.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'trip', 'chuyến đi', '/trɪp/', 'How was your trip?');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'happen', 'xảy ra', '/ˈhæp.ən/', 'What happened at the meeting?');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'enjoy', 'thích, tận hưởng', '/ɪnˈdʒɔɪ/', 'Did you enjoy the party?');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Past Simple Questions & Negatives (Câu hỏi và phủ định)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘did’ là gì?', 'MULTIPLE_CHOICE', 'thích, tận hưởng', 'đã không', 'đã (trợ động từ)', 'chuyến đi', 'C', 'Từ “did” có nghĩa là: đã (trợ động từ).', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘didn''t’ là gì?', 'MULTIPLE_CHOICE', 'chuyến đi', 'đã (trợ động từ)', 'thích, tận hưởng', 'đã không', 'D', 'Từ “didn''t” có nghĩa là: đã không.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘last week’ là gì?', 'MULTIPLE_CHOICE', 'tuần trước', 'đã (trợ động từ)', 'xảy ra', 'đã không', 'A', 'Từ “last week” có nghĩa là: tuần trước.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘trip’ là gì?', 'MULTIPLE_CHOICE', 'đã (trợ động từ)', 'đã không', 'xảy ra', 'chuyến đi', 'D', 'Từ “trip” có nghĩa là: chuyến đi.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘happen’ là gì?', 'MULTIPLE_CHOICE', 'chuyến đi', 'tuần trước', 'đã (trợ động từ)', 'xảy ra', 'D', 'Từ “happen” có nghĩa là: xảy ra.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘enjoy’ là gì?', 'MULTIPLE_CHOICE', 'đã không', 'xảy ra', 'thích, tận hưởng', 'đã (trợ động từ)', 'C', 'Từ “enjoy” có nghĩa là: thích, tận hưởng.', 'EASY', 6, 1);

-- ==============================================================================
-- TOPIC: Food & Drink (Đồ ăn & Thức uống) [BEGINNER]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Food & Drink (Đồ ăn & Thức uống)', 'Từ vựng nhà hàng, danh từ đếm được/không đếm được và mẫu câu gọi món, mua sắm.', 'BEGINNER', 'PUBLISHED', NOW() - INTERVAL 3 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: At the Restaurant (Ở nhà hàng)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'At the Restaurant (Ở nhà hàng)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'menu', 'thực đơn', '/ˈmen.juː/', 'Could I see the menu, please?');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'order', 'gọi món', '/ˈɔːr.dɚ/', 'We would like to order now.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'waiter', 'bồi bàn', '/ˈweɪ.tɚ/', 'The waiter brought our drinks.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'bill', 'hóa đơn', '/bɪl/', 'Can we have the bill, please?');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'delicious', 'ngon', '/dɪˈlɪʃ.əs/', 'The soup is delicious.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'table', 'bàn', '/ˈteɪ.bəl/', 'I booked a table for two.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – At the Restaurant (Ở nhà hàng)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘menu’ là gì?', 'MULTIPLE_CHOICE', 'hóa đơn', 'thực đơn', 'bàn', 'ngon', 'B', 'Từ “menu” có nghĩa là: thực đơn.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘order’ là gì?', 'MULTIPLE_CHOICE', 'hóa đơn', 'bồi bàn', 'gọi món', 'thực đơn', 'C', 'Từ “order” có nghĩa là: gọi món.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘waiter’ là gì?', 'MULTIPLE_CHOICE', 'ngon', 'bồi bàn', 'gọi món', 'thực đơn', 'B', 'Từ “waiter” có nghĩa là: bồi bàn.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘bill’ là gì?', 'MULTIPLE_CHOICE', 'hóa đơn', 'bồi bàn', 'thực đơn', 'bàn', 'A', 'Từ “bill” có nghĩa là: hóa đơn.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘delicious’ là gì?', 'MULTIPLE_CHOICE', 'bồi bàn', 'ngon', 'gọi món', 'hóa đơn', 'B', 'Từ “delicious” có nghĩa là: ngon.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘table’ là gì?', 'MULTIPLE_CHOICE', 'gọi món', 'bàn', 'thực đơn', 'hóa đơn', 'B', 'Từ “table” có nghĩa là: bàn.', 'EASY', 6, 1);

-- Lesson 2: Countable & Uncountable Nouns (Danh từ đếm được và không đếm được)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Countable & Uncountable Nouns (Danh từ đếm được và không đếm được)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'rice', 'gạo, cơm', '/raɪs/', 'We eat rice every day.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'water', 'nước', '/ˈwɑː.t̬ɚ/', 'Please give me some water.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'apple', 'quả táo', '/ˈæp.əl/', 'She bought three apples.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'bread', 'bánh mì', '/bred/', 'There is some bread on the table.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'bottle', 'chai', '/ˈbɑː.t̬əl/', 'I need a bottle of milk.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'sugar', 'đường', '/ˈʃʊɡ.ɚ/', 'How much sugar do you want?');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Countable & Uncountable Nouns (Danh từ đếm được và không đếm được)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘rice’ là gì?', 'MULTIPLE_CHOICE', 'quả táo', 'nước', 'chai', 'gạo, cơm', 'D', 'Từ “rice” có nghĩa là: gạo, cơm.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘water’ là gì?', 'MULTIPLE_CHOICE', 'chai', 'gạo, cơm', 'nước', 'đường', 'C', 'Từ “water” có nghĩa là: nước.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘apple’ là gì?', 'MULTIPLE_CHOICE', 'bánh mì', 'chai', 'gạo, cơm', 'quả táo', 'D', 'Từ “apple” có nghĩa là: quả táo.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘bread’ là gì?', 'MULTIPLE_CHOICE', 'quả táo', 'đường', 'bánh mì', 'chai', 'C', 'Từ “bread” có nghĩa là: bánh mì.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘bottle’ là gì?', 'MULTIPLE_CHOICE', 'chai', 'quả táo', 'nước', 'bánh mì', 'A', 'Từ “bottle” có nghĩa là: chai.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘sugar’ là gì?', 'MULTIPLE_CHOICE', 'gạo, cơm', 'nước', 'đường', 'bánh mì', 'C', 'Từ “sugar” có nghĩa là: đường.', 'EASY', 6, 1);

-- Lesson 3: Shopping for Food (Mua sắm thực phẩm)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Shopping for Food (Mua sắm thực phẩm)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'market', 'chợ', '/ˈmɑːr.kɪt/', 'We buy vegetables at the market.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'price', 'giá', '/praɪs/', 'The price is very reasonable.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'cheap', 'rẻ', '/tʃiːp/', 'Fruit is cheap in summer.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'expensive', 'đắt', '/ɪkˈspen.sɪv/', 'This restaurant is expensive.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'fresh', 'tươi', '/freʃ/', 'The fish is very fresh.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'vegetable', 'rau củ', '/ˈvedʒ.tə.bəl/', 'Eat more vegetables every day.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Shopping for Food (Mua sắm thực phẩm)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘market’ là gì?', 'MULTIPLE_CHOICE', 'tươi', 'rau củ', 'rẻ', 'chợ', 'D', 'Từ “market” có nghĩa là: chợ.', 'EASY', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘price’ là gì?', 'MULTIPLE_CHOICE', 'chợ', 'rau củ', 'giá', 'rẻ', 'C', 'Từ “price” có nghĩa là: giá.', 'EASY', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘cheap’ là gì?', 'MULTIPLE_CHOICE', 'rẻ', 'chợ', 'rau củ', 'đắt', 'A', 'Từ “cheap” có nghĩa là: rẻ.', 'EASY', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘expensive’ là gì?', 'MULTIPLE_CHOICE', 'rau củ', 'tươi', 'chợ', 'đắt', 'D', 'Từ “expensive” có nghĩa là: đắt.', 'EASY', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘fresh’ là gì?', 'MULTIPLE_CHOICE', 'rau củ', 'đắt', 'rẻ', 'tươi', 'D', 'Từ “fresh” có nghĩa là: tươi.', 'EASY', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘vegetable’ là gì?', 'MULTIPLE_CHOICE', 'tươi', 'rau củ', 'chợ', 'rẻ', 'B', 'Từ “vegetable” có nghĩa là: rau củ.', 'EASY', 6, 1);

-- ==============================================================================
-- TOPIC: Past Continuous (Thì quá khứ tiếp diễn) [INTERMEDIATE]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Past Continuous (Thì quá khứ tiếp diễn)', 'Diễn tả hành động đang diễn ra trong quá khứ và cách kết hợp với thì quá khứ đơn.', 'INTERMEDIATE', 'PUBLISHED', NOW() - INTERVAL 4 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Form & Use (Cấu trúc và cách dùng)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Form & Use (Cấu trúc và cách dùng)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'while', 'trong khi', '/waɪl/', 'While I was cooking, she was reading.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'during', 'trong suốt', '/ˈdʊr.ɪŋ/', 'We met during the summer holiday.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'noise', 'tiếng ồn', '/nɔɪz/', 'The noise woke me up.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'interrupt', 'ngắt lời, làm gián đoạn', '/ˌɪn.t̬əˈrʌpt/', 'Please don''t interrupt me.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'background', 'bối cảnh', '/ˈbæk.ɡraʊnd/', 'Music was playing in the background.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'moment', 'khoảnh khắc', '/ˈmoʊ.mənt/', 'At that moment, it started to rain.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Form & Use (Cấu trúc và cách dùng)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘while’ là gì?', 'MULTIPLE_CHOICE', 'trong suốt', 'trong khi', 'ngắt lời, làm gián đoạn', 'bối cảnh', 'B', 'Từ “while” có nghĩa là: trong khi.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘during’ là gì?', 'MULTIPLE_CHOICE', 'trong suốt', 'ngắt lời, làm gián đoạn', 'trong khi', 'bối cảnh', 'A', 'Từ “during” có nghĩa là: trong suốt.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘noise’ là gì?', 'MULTIPLE_CHOICE', 'tiếng ồn', 'ngắt lời, làm gián đoạn', 'trong suốt', 'bối cảnh', 'A', 'Từ “noise” có nghĩa là: tiếng ồn.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘interrupt’ là gì?', 'MULTIPLE_CHOICE', 'khoảnh khắc', 'ngắt lời, làm gián đoạn', 'bối cảnh', 'tiếng ồn', 'B', 'Từ “interrupt” có nghĩa là: ngắt lời, làm gián đoạn.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘background’ là gì?', 'MULTIPLE_CHOICE', 'trong suốt', 'bối cảnh', 'khoảnh khắc', 'trong khi', 'B', 'Từ “background” có nghĩa là: bối cảnh.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘moment’ là gì?', 'MULTIPLE_CHOICE', 'tiếng ồn', 'ngắt lời, làm gián đoạn', 'khoảnh khắc', 'trong khi', 'C', 'Từ “moment” có nghĩa là: khoảnh khắc.', 'MEDIUM', 6, 1);

-- Lesson 2: Past Continuous vs Past Simple (So sánh hai thì)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Past Continuous vs Past Simple (So sánh hai thì)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ring', 'reo (chuông)', '/rɪŋ/', 'The phone rang while I was sleeping.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'arrive', 'đến', '/əˈraɪv/', 'They arrived when we were having dinner.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'suddenly', 'đột nhiên', '/ˈsʌd.ən.li/', 'Suddenly, the lights went out.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'accident', 'tai nạn', '/ˈæk.sə.dənt/', 'He saw the accident while driving home.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'police', 'cảnh sát', '/pəˈliːs/', 'The police arrived at the scene.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'witness', 'nhân chứng', '/ˈwɪt.nəs/', 'A witness described what was happening.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Past Continuous vs Past Simple (So sánh hai thì)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘ring’ là gì?', 'MULTIPLE_CHOICE', 'nhân chứng', 'đột nhiên', 'reo (chuông)', 'cảnh sát', 'C', 'Từ “ring” có nghĩa là: reo (chuông).', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘arrive’ là gì?', 'MULTIPLE_CHOICE', 'đột nhiên', 'cảnh sát', 'reo (chuông)', 'đến', 'D', 'Từ “arrive” có nghĩa là: đến.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘suddenly’ là gì?', 'MULTIPLE_CHOICE', 'nhân chứng', 'reo (chuông)', 'cảnh sát', 'đột nhiên', 'D', 'Từ “suddenly” có nghĩa là: đột nhiên.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘accident’ là gì?', 'MULTIPLE_CHOICE', 'cảnh sát', 'đột nhiên', 'tai nạn', 'nhân chứng', 'C', 'Từ “accident” có nghĩa là: tai nạn.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘police’ là gì?', 'MULTIPLE_CHOICE', 'đến', 'nhân chứng', 'reo (chuông)', 'cảnh sát', 'D', 'Từ “police” có nghĩa là: cảnh sát.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘witness’ là gì?', 'MULTIPLE_CHOICE', 'nhân chứng', 'đến', 'tai nạn', 'đột nhiên', 'A', 'Từ “witness” có nghĩa là: nhân chứng.', 'MEDIUM', 6, 1);

-- Lesson 3: Storytelling with While/When (Kể chuyện quá khứ)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Storytelling with While/When (Kể chuyện quá khứ)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'story', 'câu chuyện', '/ˈstɔːr.i/', 'She told us an interesting story.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'scene', 'cảnh', '/siːn/', 'The scene was very dramatic.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'character', 'nhân vật', '/ˈker.ək.tɚ/', 'The main character is a young doctor.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'plot', 'cốt truyện', '/plɑːt/', 'The plot was easy to follow.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ending', 'kết thúc', '/ˈen.dɪŋ/', 'The story has a happy ending.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'remember', 'nhớ', '/rɪˈmem.bɚ/', 'I remember that day clearly.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Storytelling with While/When (Kể chuyện quá khứ)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘story’ là gì?', 'MULTIPLE_CHOICE', 'nhân vật', 'nhớ', 'cảnh', 'câu chuyện', 'D', 'Từ “story” có nghĩa là: câu chuyện.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘scene’ là gì?', 'MULTIPLE_CHOICE', 'nhân vật', 'cảnh', 'nhớ', 'cốt truyện', 'B', 'Từ “scene” có nghĩa là: cảnh.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘character’ là gì?', 'MULTIPLE_CHOICE', 'cốt truyện', 'nhân vật', 'câu chuyện', 'nhớ', 'B', 'Từ “character” có nghĩa là: nhân vật.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘plot’ là gì?', 'MULTIPLE_CHOICE', 'cốt truyện', 'câu chuyện', 'nhớ', 'kết thúc', 'A', 'Từ “plot” có nghĩa là: cốt truyện.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘ending’ là gì?', 'MULTIPLE_CHOICE', 'cảnh', 'nhân vật', 'câu chuyện', 'kết thúc', 'D', 'Từ “ending” có nghĩa là: kết thúc.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘remember’ là gì?', 'MULTIPLE_CHOICE', 'cảnh', 'nhớ', 'kết thúc', 'câu chuyện', 'B', 'Từ “remember” có nghĩa là: nhớ.', 'MEDIUM', 6, 1);

-- ==============================================================================
-- TOPIC: Present Perfect vs Past Simple (Hiện tại hoàn thành & Quá khứ đơn) [INTERMEDIATE]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Present Perfect vs Past Simple (Hiện tại hoàn thành & Quá khứ đơn)', 'Phân biệt hành động đã kết thúc với trải nghiệm còn liên quan đến hiện tại.', 'INTERMEDIATE', 'PUBLISHED', NOW() - INTERVAL 5 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Experience with Ever/Never (Trải nghiệm)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Experience with Ever/Never (Trải nghiệm)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'experience', 'kinh nghiệm', '/ɪkˈspɪr.i.əns/', 'She has a lot of teaching experience.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ever', 'đã từng', '/ˈev.ɚ/', 'Have you ever been to Japan?');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'never', 'chưa bao giờ', '/ˈnev.ɚ/', 'I have never eaten sushi.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'abroad', 'ở nước ngoài', '/əˈbrɔːd/', 'He has studied abroad for two years.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'try', 'thử', '/traɪ/', 'Have you tried this dish?');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'achievement', 'thành tựu', '/əˈtʃiːv.mənt/', 'Winning the prize was a great achievement.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Experience with Ever/Never (Trải nghiệm)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘experience’ là gì?', 'MULTIPLE_CHOICE', 'ở nước ngoài', 'thành tựu', 'chưa bao giờ', 'kinh nghiệm', 'D', 'Từ “experience” có nghĩa là: kinh nghiệm.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘ever’ là gì?', 'MULTIPLE_CHOICE', 'thành tựu', 'ở nước ngoài', 'đã từng', 'kinh nghiệm', 'C', 'Từ “ever” có nghĩa là: đã từng.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘never’ là gì?', 'MULTIPLE_CHOICE', 'đã từng', 'chưa bao giờ', 'thử', 'kinh nghiệm', 'B', 'Từ “never” có nghĩa là: chưa bao giờ.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘abroad’ là gì?', 'MULTIPLE_CHOICE', 'kinh nghiệm', 'thành tựu', 'đã từng', 'ở nước ngoài', 'D', 'Từ “abroad” có nghĩa là: ở nước ngoài.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘try’ là gì?', 'MULTIPLE_CHOICE', 'ở nước ngoài', 'thử', 'thành tựu', 'kinh nghiệm', 'B', 'Từ “try” có nghĩa là: thử.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘achievement’ là gì?', 'MULTIPLE_CHOICE', 'kinh nghiệm', 'ở nước ngoài', 'đã từng', 'thành tựu', 'D', 'Từ “achievement” có nghĩa là: thành tựu.', 'MEDIUM', 6, 1);

-- Lesson 2: Just, Already, Yet (Các trạng từ đặc trưng)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Just, Already, Yet (Các trạng từ đặc trưng)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'just', 'vừa mới', '/dʒʌst/', 'I have just finished my homework.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'already', 'đã ... rồi', '/ɔːlˈred.i/', 'She has already left the office.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'yet', 'chưa (trong câu hỏi/phủ định)', '/jet/', 'Have you called him yet?');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'recently', 'gần đây', '/ˈriː.sənt.li/', 'They have recently moved house.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'finish', 'hoàn thành', '/ˈfɪn.ɪʃ/', 'Have you finished the report?');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'prepare', 'chuẩn bị', '/prɪˈper/', 'He has prepared everything for the trip.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Just, Already, Yet (Các trạng từ đặc trưng)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘just’ là gì?', 'MULTIPLE_CHOICE', 'vừa mới', 'gần đây', 'hoàn thành', 'chuẩn bị', 'A', 'Từ “just” có nghĩa là: vừa mới.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘already’ là gì?', 'MULTIPLE_CHOICE', 'vừa mới', 'hoàn thành', 'chưa (trong câu hỏi/phủ định)', 'đã ... rồi', 'D', 'Từ “already” có nghĩa là: đã ... rồi.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘yet’ là gì?', 'MULTIPLE_CHOICE', 'chưa (trong câu hỏi/phủ định)', 'đã ... rồi', 'chuẩn bị', 'hoàn thành', 'A', 'Từ “yet” có nghĩa là: chưa (trong câu hỏi/phủ định).', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘recently’ là gì?', 'MULTIPLE_CHOICE', 'gần đây', 'vừa mới', 'chưa (trong câu hỏi/phủ định)', 'đã ... rồi', 'A', 'Từ “recently” có nghĩa là: gần đây.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘finish’ là gì?', 'MULTIPLE_CHOICE', 'chưa (trong câu hỏi/phủ định)', 'đã ... rồi', 'gần đây', 'hoàn thành', 'D', 'Từ “finish” có nghĩa là: hoàn thành.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘prepare’ là gì?', 'MULTIPLE_CHOICE', 'hoàn thành', 'chuẩn bị', 'chưa (trong câu hỏi/phủ định)', 'vừa mới', 'B', 'Từ “prepare” có nghĩa là: chuẩn bị.', 'MEDIUM', 6, 1);

-- Lesson 3: For & Since (Cách dùng giới từ thời gian)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'For & Since (Cách dùng giới từ thời gian)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'for', 'trong khoảng', '/fɔːr/', 'I have lived here for five years.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'since', 'kể từ', '/sɪns/', 'She has worked here since 2020.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'decade', 'thập kỷ', '/ˈdek.eɪd/', 'The city has changed over the last decade.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'lately', 'gần đây', '/ˈleɪt.li/', 'I haven''t seen him lately.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'change', 'thay đổi', '/tʃeɪndʒ/', 'Her English has changed a lot.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'improve', 'cải thiện', '/ɪmˈpruːv/', 'My speaking has improved since then.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – For & Since (Cách dùng giới từ thời gian)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘for’ là gì?', 'MULTIPLE_CHOICE', 'thay đổi', 'gần đây', 'thập kỷ', 'trong khoảng', 'D', 'Từ “for” có nghĩa là: trong khoảng.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘since’ là gì?', 'MULTIPLE_CHOICE', 'gần đây', 'trong khoảng', 'kể từ', 'thay đổi', 'C', 'Từ “since” có nghĩa là: kể từ.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘decade’ là gì?', 'MULTIPLE_CHOICE', 'gần đây', 'cải thiện', 'thay đổi', 'thập kỷ', 'D', 'Từ “decade” có nghĩa là: thập kỷ.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘lately’ là gì?', 'MULTIPLE_CHOICE', 'thay đổi', 'kể từ', 'thập kỷ', 'gần đây', 'D', 'Từ “lately” có nghĩa là: gần đây.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘change’ là gì?', 'MULTIPLE_CHOICE', 'gần đây', 'kể từ', 'thập kỷ', 'thay đổi', 'D', 'Từ “change” có nghĩa là: thay đổi.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘improve’ là gì?', 'MULTIPLE_CHOICE', 'gần đây', 'thay đổi', 'trong khoảng', 'cải thiện', 'D', 'Từ “improve” có nghĩa là: cải thiện.', 'MEDIUM', 6, 1);

-- ==============================================================================
-- TOPIC: Work & Career (Công việc & Sự nghiệp) [INTERMEDIATE]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Work & Career (Công việc & Sự nghiệp)', 'Từ vựng phỏng vấn xin việc, giao tiếp nơi làm việc và cụm động từ công sở.', 'INTERMEDIATE', 'PUBLISHED', NOW() - INTERVAL 6 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Job Interviews (Phỏng vấn xin việc)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Job Interviews (Phỏng vấn xin việc)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'interview', 'buổi phỏng vấn', '/ˈɪn.t̬ɚ.vjuː/', 'I have a job interview tomorrow.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'resume', 'sơ yếu lý lịch', '/ˈrez.ə.meɪ/', 'Please send us your resume.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'candidate', 'ứng viên', '/ˈkæn.dɪ.dət/', 'The candidate has strong skills.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'skill', 'kỹ năng', '/skɪl/', 'Communication is an important skill.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'salary', 'mức lương', '/ˈsæl.ɚ.i/', 'They offered a competitive salary.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'position', 'vị trí', '/pəˈzɪʃ.ən/', 'She applied for a marketing position.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Job Interviews (Phỏng vấn xin việc)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘interview’ là gì?', 'MULTIPLE_CHOICE', 'kỹ năng', 'vị trí', 'sơ yếu lý lịch', 'buổi phỏng vấn', 'D', 'Từ “interview” có nghĩa là: buổi phỏng vấn.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘resume’ là gì?', 'MULTIPLE_CHOICE', 'kỹ năng', 'ứng viên', 'buổi phỏng vấn', 'sơ yếu lý lịch', 'D', 'Từ “resume” có nghĩa là: sơ yếu lý lịch.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘candidate’ là gì?', 'MULTIPLE_CHOICE', 'ứng viên', 'kỹ năng', 'mức lương', 'buổi phỏng vấn', 'A', 'Từ “candidate” có nghĩa là: ứng viên.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘skill’ là gì?', 'MULTIPLE_CHOICE', 'sơ yếu lý lịch', 'kỹ năng', 'ứng viên', 'vị trí', 'B', 'Từ “skill” có nghĩa là: kỹ năng.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘salary’ là gì?', 'MULTIPLE_CHOICE', 'buổi phỏng vấn', 'vị trí', 'mức lương', 'sơ yếu lý lịch', 'C', 'Từ “salary” có nghĩa là: mức lương.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘position’ là gì?', 'MULTIPLE_CHOICE', 'kỹ năng', 'sơ yếu lý lịch', 'ứng viên', 'vị trí', 'D', 'Từ “position” có nghĩa là: vị trí.', 'MEDIUM', 6, 1);

-- Lesson 2: Workplace Communication (Giao tiếp nơi làm việc)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Workplace Communication (Giao tiếp nơi làm việc)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'deadline', 'hạn chót', '/ˈded.laɪn/', 'We must meet the deadline.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'meeting', 'cuộc họp', '/ˈmiː.t̬ɪŋ/', 'The meeting starts at ten.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'colleague', 'đồng nghiệp', '/ˈkɑː.liːɡ/', 'My colleagues are very friendly.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'feedback', 'phản hồi', '/ˈfiːd.bæk/', 'Thank you for your feedback.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'report', 'báo cáo', '/rɪˈpɔːrt/', 'I sent the monthly report.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'schedule', 'lên lịch', '/ˈskedʒ.uːl/', 'Let''s schedule a call next week.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Workplace Communication (Giao tiếp nơi làm việc)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘deadline’ là gì?', 'MULTIPLE_CHOICE', 'báo cáo', 'phản hồi', 'hạn chót', 'cuộc họp', 'C', 'Từ “deadline” có nghĩa là: hạn chót.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘meeting’ là gì?', 'MULTIPLE_CHOICE', 'cuộc họp', 'lên lịch', 'hạn chót', 'phản hồi', 'A', 'Từ “meeting” có nghĩa là: cuộc họp.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘colleague’ là gì?', 'MULTIPLE_CHOICE', 'hạn chót', 'cuộc họp', 'đồng nghiệp', 'phản hồi', 'C', 'Từ “colleague” có nghĩa là: đồng nghiệp.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘feedback’ là gì?', 'MULTIPLE_CHOICE', 'hạn chót', 'báo cáo', 'phản hồi', 'lên lịch', 'C', 'Từ “feedback” có nghĩa là: phản hồi.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘report’ là gì?', 'MULTIPLE_CHOICE', 'hạn chót', 'phản hồi', 'báo cáo', 'lên lịch', 'C', 'Từ “report” có nghĩa là: báo cáo.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘schedule’ là gì?', 'MULTIPLE_CHOICE', 'báo cáo', 'hạn chót', 'lên lịch', 'phản hồi', 'C', 'Từ “schedule” có nghĩa là: lên lịch.', 'MEDIUM', 6, 1);

-- Lesson 3: Phrasal Verbs at Work (Cụm động từ công sở)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Phrasal Verbs at Work (Cụm động từ công sở)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'follow up', 'theo dõi, nhắc lại', '/ˈfɑː.loʊ ʌp/', 'I will follow up on that email.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'take on', 'đảm nhận', '/teɪk ɑːn/', 'She took on a new project.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'set up', 'thiết lập', '/set ʌp/', 'We set up a meeting with the client.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'figure out', 'tìm ra', '/ˈfɪɡ.jɚ aʊt/', 'Let''s figure out the problem together.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'carry out', 'thực hiện', '/ˈker.i aʊt/', 'They carried out a survey.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'put off', 'trì hoãn', '/pʊt ɔːf/', 'Don''t put off your work until tomorrow.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Phrasal Verbs at Work (Cụm động từ công sở)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘follow up’ là gì?', 'MULTIPLE_CHOICE', 'thực hiện', 'tìm ra', 'trì hoãn', 'theo dõi, nhắc lại', 'D', 'Từ “follow up” có nghĩa là: theo dõi, nhắc lại.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘take on’ là gì?', 'MULTIPLE_CHOICE', 'thực hiện', 'đảm nhận', 'theo dõi, nhắc lại', 'trì hoãn', 'B', 'Từ “take on” có nghĩa là: đảm nhận.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘set up’ là gì?', 'MULTIPLE_CHOICE', 'trì hoãn', 'đảm nhận', 'thiết lập', 'theo dõi, nhắc lại', 'C', 'Từ “set up” có nghĩa là: thiết lập.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘figure out’ là gì?', 'MULTIPLE_CHOICE', 'thực hiện', 'tìm ra', 'đảm nhận', 'trì hoãn', 'B', 'Từ “figure out” có nghĩa là: tìm ra.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘carry out’ là gì?', 'MULTIPLE_CHOICE', 'trì hoãn', 'đảm nhận', 'thực hiện', 'theo dõi, nhắc lại', 'C', 'Từ “carry out” có nghĩa là: thực hiện.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘put off’ là gì?', 'MULTIPLE_CHOICE', 'thiết lập', 'theo dõi, nhắc lại', 'tìm ra', 'trì hoãn', 'D', 'Từ “put off” có nghĩa là: trì hoãn.', 'MEDIUM', 6, 1);

-- ==============================================================================
-- TOPIC: Travel & Culture (Du lịch & Văn hóa) [INTERMEDIATE]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Travel & Culture (Du lịch & Văn hóa)', 'Lên kế hoạch chuyến đi, sân bay và kể lại trải nghiệm bằng các thì quá khứ.', 'INTERMEDIATE', 'PUBLISHED', NOW() - INTERVAL 7 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Planning a Trip (Lên kế hoạch chuyến đi)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Planning a Trip (Lên kế hoạch chuyến đi)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'itinerary', 'lịch trình', '/aɪˈtɪn.ə.rer.i/', 'Our itinerary includes three cities.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'destination', 'điểm đến', '/ˌdes.təˈneɪ.ʃən/', 'Da Lat is a popular destination.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'book', 'đặt chỗ', '/bʊk/', 'I booked the hotel online.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'accommodation', 'chỗ ở', '/əˌkɑː.məˈdeɪ.ʃən/', 'The accommodation was comfortable.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'budget', 'ngân sách', '/ˈbʌdʒ.ɪt/', 'We planned a small budget for the trip.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'guidebook', 'sách hướng dẫn', '/ˈɡaɪd.bʊk/', 'She bought a guidebook before leaving.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Planning a Trip (Lên kế hoạch chuyến đi)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘itinerary’ là gì?', 'MULTIPLE_CHOICE', 'sách hướng dẫn', 'lịch trình', 'chỗ ở', 'ngân sách', 'B', 'Từ “itinerary” có nghĩa là: lịch trình.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘destination’ là gì?', 'MULTIPLE_CHOICE', 'lịch trình', 'ngân sách', 'chỗ ở', 'điểm đến', 'D', 'Từ “destination” có nghĩa là: điểm đến.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘book’ là gì?', 'MULTIPLE_CHOICE', 'chỗ ở', 'đặt chỗ', 'lịch trình', 'sách hướng dẫn', 'B', 'Từ “book” có nghĩa là: đặt chỗ.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘accommodation’ là gì?', 'MULTIPLE_CHOICE', 'lịch trình', 'chỗ ở', 'điểm đến', 'đặt chỗ', 'B', 'Từ “accommodation” có nghĩa là: chỗ ở.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘budget’ là gì?', 'MULTIPLE_CHOICE', 'chỗ ở', 'ngân sách', 'sách hướng dẫn', 'lịch trình', 'B', 'Từ “budget” có nghĩa là: ngân sách.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘guidebook’ là gì?', 'MULTIPLE_CHOICE', 'sách hướng dẫn', 'chỗ ở', 'ngân sách', 'lịch trình', 'A', 'Từ “guidebook” có nghĩa là: sách hướng dẫn.', 'MEDIUM', 6, 1);

-- Lesson 2: At the Airport (Ở sân bay)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'At the Airport (Ở sân bay)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'passport', 'hộ chiếu', '/ˈpæs.pɔːrt/', 'Please show me your passport.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'boarding pass', 'thẻ lên máy bay', '/ˈbɔːr.dɪŋ pæs/', 'Keep your boarding pass ready.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'luggage', 'hành lý', '/ˈlʌɡ.ɪdʒ/', 'My luggage was too heavy.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'departure', 'khởi hành', '/dɪˈpɑːr.tʃɚ/', 'The departure gate has changed.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'delay', 'hoãn', '/dɪˈleɪ/', 'The flight delay was two hours.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'customs', 'hải quan', '/ˈkʌs.təmz/', 'We went through customs quickly.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – At the Airport (Ở sân bay)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘passport’ là gì?', 'MULTIPLE_CHOICE', 'hộ chiếu', 'hải quan', 'thẻ lên máy bay', 'hoãn', 'A', 'Từ “passport” có nghĩa là: hộ chiếu.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘boarding pass’ là gì?', 'MULTIPLE_CHOICE', 'thẻ lên máy bay', 'hoãn', 'hành lý', 'hộ chiếu', 'A', 'Từ “boarding pass” có nghĩa là: thẻ lên máy bay.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘luggage’ là gì?', 'MULTIPLE_CHOICE', 'hộ chiếu', 'hải quan', 'hành lý', 'khởi hành', 'C', 'Từ “luggage” có nghĩa là: hành lý.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘departure’ là gì?', 'MULTIPLE_CHOICE', 'hoãn', 'khởi hành', 'thẻ lên máy bay', 'hành lý', 'B', 'Từ “departure” có nghĩa là: khởi hành.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘delay’ là gì?', 'MULTIPLE_CHOICE', 'hải quan', 'hoãn', 'khởi hành', 'thẻ lên máy bay', 'B', 'Từ “delay” có nghĩa là: hoãn.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘customs’ là gì?', 'MULTIPLE_CHOICE', 'thẻ lên máy bay', 'hành lý', 'hải quan', 'hộ chiếu', 'C', 'Từ “customs” có nghĩa là: hải quan.', 'MEDIUM', 6, 1);

-- Lesson 3: Describing Past Experiences (Kể lại trải nghiệm)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Describing Past Experiences (Kể lại trải nghiệm)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'journey', 'hành trình', '/ˈdʒɝː.ni/', 'The journey took ten hours.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'memorable', 'đáng nhớ', '/ˈmem.ɚ.ə.bəl/', 'It was a memorable holiday.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'adventure', 'cuộc phiêu lưu', '/ədˈven.tʃɚ/', 'We had a great adventure in the mountains.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'sightseeing', 'tham quan', '/ˈsaɪtˌsiː.ɪŋ/', 'We went sightseeing all day.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'local', 'người địa phương', '/ˈloʊ.kəl/', 'The local people were very kind.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'souvenir', 'quà lưu niệm', '/ˌsuː.vəˈnɪr/', 'I bought a souvenir for my family.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Describing Past Experiences (Kể lại trải nghiệm)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘journey’ là gì?', 'MULTIPLE_CHOICE', 'người địa phương', 'hành trình', 'quà lưu niệm', 'đáng nhớ', 'B', 'Từ “journey” có nghĩa là: hành trình.', 'MEDIUM', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘memorable’ là gì?', 'MULTIPLE_CHOICE', 'cuộc phiêu lưu', 'đáng nhớ', 'quà lưu niệm', 'tham quan', 'B', 'Từ “memorable” có nghĩa là: đáng nhớ.', 'MEDIUM', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘adventure’ là gì?', 'MULTIPLE_CHOICE', 'tham quan', 'cuộc phiêu lưu', 'người địa phương', 'quà lưu niệm', 'B', 'Từ “adventure” có nghĩa là: cuộc phiêu lưu.', 'MEDIUM', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘sightseeing’ là gì?', 'MULTIPLE_CHOICE', 'đáng nhớ', 'cuộc phiêu lưu', 'quà lưu niệm', 'tham quan', 'D', 'Từ “sightseeing” có nghĩa là: tham quan.', 'MEDIUM', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘local’ là gì?', 'MULTIPLE_CHOICE', 'quà lưu niệm', 'đáng nhớ', 'người địa phương', 'tham quan', 'C', 'Từ “local” có nghĩa là: người địa phương.', 'MEDIUM', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘souvenir’ là gì?', 'MULTIPLE_CHOICE', 'hành trình', 'cuộc phiêu lưu', 'tham quan', 'quà lưu niệm', 'D', 'Từ “souvenir” có nghĩa là: quà lưu niệm.', 'MEDIUM', 6, 1);

-- ==============================================================================
-- TOPIC: Past Perfect (Thì quá khứ hoàn thành) [ADVANCED]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Past Perfect (Thì quá khứ hoàn thành)', 'Diễn tả hành động xảy ra trước một hành động khác trong quá khứ và các thì tường thuật.', 'ADVANCED', 'PUBLISHED', NOW() - INTERVAL 8 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Form & Use (Cấu trúc và cách dùng)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Form & Use (Cấu trúc và cách dùng)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'had', 'đã (trợ động từ)', '/hæd/', 'She had left before I arrived.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'before', 'trước khi', '/bɪˈfɔːr/', 'He had finished the report before the meeting.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'after', 'sau khi', '/ˈæf.tɚ/', 'We went home after the film had ended.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'already', 'đã ... rồi', '/ɔːlˈred.i/', 'They had already eaten when we came.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'by the time', 'vào lúc', '/baɪ ðə taɪm/', 'By the time we arrived, the show had started.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'realize', 'nhận ra', '/ˈriː.ə.laɪz/', 'I realized I had forgotten my keys.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Form & Use (Cấu trúc và cách dùng)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘had’ là gì?', 'MULTIPLE_CHOICE', 'đã (trợ động từ)', 'vào lúc', 'nhận ra', 'sau khi', 'A', 'Từ “had” có nghĩa là: đã (trợ động từ).', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘before’ là gì?', 'MULTIPLE_CHOICE', 'trước khi', 'đã ... rồi', 'nhận ra', 'đã (trợ động từ)', 'A', 'Từ “before” có nghĩa là: trước khi.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘after’ là gì?', 'MULTIPLE_CHOICE', 'sau khi', 'đã (trợ động từ)', 'trước khi', 'vào lúc', 'A', 'Từ “after” có nghĩa là: sau khi.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘already’ là gì?', 'MULTIPLE_CHOICE', 'vào lúc', 'đã ... rồi', 'nhận ra', 'trước khi', 'B', 'Từ “already” có nghĩa là: đã ... rồi.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘by the time’ là gì?', 'MULTIPLE_CHOICE', 'vào lúc', 'sau khi', 'đã ... rồi', 'đã (trợ động từ)', 'A', 'Từ “by the time” có nghĩa là: vào lúc.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘realize’ là gì?', 'MULTIPLE_CHOICE', 'nhận ra', 'đã (trợ động từ)', 'trước khi', 'sau khi', 'A', 'Từ “realize” có nghĩa là: nhận ra.', 'HARD', 6, 1);

-- Lesson 2: Past Perfect vs Past Simple (Phân biệt)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Past Perfect vs Past Simple (Phân biệt)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'sequence', 'trình tự', '/ˈsiː.kwəns/', 'Put the events in the correct sequence.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'previously', 'trước đó', '/ˈpriː.vi.əs.li/', 'She had previously worked in banking.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'event', 'sự kiện', '/ɪˈvent/', 'The event had ended before midnight.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'consequence', 'hậu quả', '/ˈkɑːn.sə.kwens/', 'The decision had serious consequences.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'mistake', 'lỗi', '/mɪˈsteɪk/', 'He had made a small mistake.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'correct', 'sửa, đúng', '/kəˈrekt/', 'Please correct the errors in the text.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Past Perfect vs Past Simple (Phân biệt)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘sequence’ là gì?', 'MULTIPLE_CHOICE', 'hậu quả', 'lỗi', 'trình tự', 'trước đó', 'C', 'Từ “sequence” có nghĩa là: trình tự.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘previously’ là gì?', 'MULTIPLE_CHOICE', 'sửa, đúng', 'trước đó', 'lỗi', 'hậu quả', 'B', 'Từ “previously” có nghĩa là: trước đó.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘event’ là gì?', 'MULTIPLE_CHOICE', 'lỗi', 'trước đó', 'hậu quả', 'sự kiện', 'D', 'Từ “event” có nghĩa là: sự kiện.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘consequence’ là gì?', 'MULTIPLE_CHOICE', 'sự kiện', 'trước đó', 'hậu quả', 'trình tự', 'C', 'Từ “consequence” có nghĩa là: hậu quả.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘mistake’ là gì?', 'MULTIPLE_CHOICE', 'trước đó', 'lỗi', 'sự kiện', 'trình tự', 'B', 'Từ “mistake” có nghĩa là: lỗi.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘correct’ là gì?', 'MULTIPLE_CHOICE', 'trước đó', 'sự kiện', 'sửa, đúng', 'trình tự', 'C', 'Từ “correct” có nghĩa là: sửa, đúng.', 'HARD', 6, 1);

-- Lesson 3: Narrative Tenses (Kể chuyện nâng cao)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Narrative Tenses (Kể chuyện nâng cao)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'narrative', 'bài tường thuật', '/ˈner.ə.tɪv/', 'The narrative moves between past and present.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'flashback', 'hồi tưởng', '/ˈflæʃ.bæk/', 'The film uses flashbacks to explain the plot.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'tension', 'sự căng thẳng', '/ˈten.ʃən/', 'The tension increased near the end.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'climax', 'cao trào', '/ˈklaɪ.mæks/', 'The climax of the story was unforgettable.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'resolution', 'kết thúc, cách giải quyết', '/ˌrez.əˈluː.ʃən/', 'The resolution surprised everyone.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'vivid', 'sinh động', '/ˈvɪv.ɪd/', 'She gave a vivid description of the city.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Narrative Tenses (Kể chuyện nâng cao)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘narrative’ là gì?', 'MULTIPLE_CHOICE', 'sinh động', 'bài tường thuật', 'cao trào', 'hồi tưởng', 'B', 'Từ “narrative” có nghĩa là: bài tường thuật.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘flashback’ là gì?', 'MULTIPLE_CHOICE', 'sự căng thẳng', 'cao trào', 'hồi tưởng', 'sinh động', 'C', 'Từ “flashback” có nghĩa là: hồi tưởng.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘tension’ là gì?', 'MULTIPLE_CHOICE', 'sự căng thẳng', 'hồi tưởng', 'kết thúc, cách giải quyết', 'bài tường thuật', 'A', 'Từ “tension” có nghĩa là: sự căng thẳng.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘climax’ là gì?', 'MULTIPLE_CHOICE', 'cao trào', 'sinh động', 'kết thúc, cách giải quyết', 'hồi tưởng', 'A', 'Từ “climax” có nghĩa là: cao trào.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘resolution’ là gì?', 'MULTIPLE_CHOICE', 'kết thúc, cách giải quyết', 'bài tường thuật', 'cao trào', 'sự căng thẳng', 'A', 'Từ “resolution” có nghĩa là: kết thúc, cách giải quyết.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘vivid’ là gì?', 'MULTIPLE_CHOICE', 'sinh động', 'bài tường thuật', 'kết thúc, cách giải quyết', 'sự căng thẳng', 'A', 'Từ “vivid” có nghĩa là: sinh động.', 'HARD', 6, 1);

-- ==============================================================================
-- TOPIC: Past Perfect Continuous (Thì quá khứ hoàn thành tiếp diễn) [ADVANCED]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Past Perfect Continuous (Thì quá khứ hoàn thành tiếp diễn)', 'Nhấn mạnh khoảng thời gian hành động kéo dài trước một mốc quá khứ và ôn tập các thì quá khứ.', 'ADVANCED', 'PUBLISHED', NOW() - INTERVAL 9 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Duration before the Past (Nhấn mạnh khoảng thời gian)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Duration before the Past (Nhấn mạnh khoảng thời gian)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'duration', 'khoảng thời gian', '/duˈreɪ.ʃən/', 'The duration of the project was six months.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'continuously', 'liên tục', '/kənˈtɪn.ju.əs.li/', 'It had been raining continuously for days.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'exhaustion', 'sự kiệt sức', '/ɪɡˈzɑːs.tʃən/', 'He felt exhaustion after the long journey.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'preparation', 'sự chuẩn bị', '/ˌprep.əˈreɪ.ʃən/', 'They had been doing preparation all week.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'effort', 'nỗ lực', '/ˈef.ɚt/', 'Her effort finally paid off.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'progress', 'tiến bộ', '/ˈprɑː.ɡres/', 'We had been making good progress.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Duration before the Past (Nhấn mạnh khoảng thời gian)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘duration’ là gì?', 'MULTIPLE_CHOICE', 'liên tục', 'sự chuẩn bị', 'nỗ lực', 'khoảng thời gian', 'D', 'Từ “duration” có nghĩa là: khoảng thời gian.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘continuously’ là gì?', 'MULTIPLE_CHOICE', 'nỗ lực', 'khoảng thời gian', 'liên tục', 'tiến bộ', 'C', 'Từ “continuously” có nghĩa là: liên tục.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘exhaustion’ là gì?', 'MULTIPLE_CHOICE', 'nỗ lực', 'khoảng thời gian', 'sự kiệt sức', 'tiến bộ', 'C', 'Từ “exhaustion” có nghĩa là: sự kiệt sức.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘preparation’ là gì?', 'MULTIPLE_CHOICE', 'sự chuẩn bị', 'nỗ lực', 'khoảng thời gian', 'sự kiệt sức', 'A', 'Từ “preparation” có nghĩa là: sự chuẩn bị.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘effort’ là gì?', 'MULTIPLE_CHOICE', 'khoảng thời gian', 'liên tục', 'nỗ lực', 'sự chuẩn bị', 'C', 'Từ “effort” có nghĩa là: nỗ lực.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘progress’ là gì?', 'MULTIPLE_CHOICE', 'tiến bộ', 'sự chuẩn bị', 'liên tục', 'sự kiệt sức', 'A', 'Từ “progress” có nghĩa là: tiến bộ.', 'HARD', 6, 1);

-- Lesson 2: Past Perfect Simple vs Continuous (So sánh)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Past Perfect Simple vs Continuous (So sánh)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'emphasis', 'sự nhấn mạnh', '/ˈem.fə.sɪs/', 'The sentence puts emphasis on the duration.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'result', 'kết quả', '/rɪˈzʌlt/', 'The result was better than expected.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'process', 'quá trình', '/ˈprɑː.ses/', 'Learning a language is a long process.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'completed', 'đã hoàn thành', '/kəmˈpliː.t̬ɪd/', 'She had completed the course.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ongoing', 'đang tiếp diễn', '/ˈɑːnˌɡoʊ.ɪŋ/', 'The ongoing project needs more time.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'difference', 'sự khác biệt', '/ˈdɪf.ɚ.əns/', 'Can you explain the difference between them?');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Past Perfect Simple vs Continuous (So sánh)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘emphasis’ là gì?', 'MULTIPLE_CHOICE', 'kết quả', 'sự nhấn mạnh', 'đã hoàn thành', 'sự khác biệt', 'B', 'Từ “emphasis” có nghĩa là: sự nhấn mạnh.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘result’ là gì?', 'MULTIPLE_CHOICE', 'kết quả', 'sự nhấn mạnh', 'đã hoàn thành', 'đang tiếp diễn', 'A', 'Từ “result” có nghĩa là: kết quả.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘process’ là gì?', 'MULTIPLE_CHOICE', 'kết quả', 'đã hoàn thành', 'sự nhấn mạnh', 'quá trình', 'D', 'Từ “process” có nghĩa là: quá trình.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘completed’ là gì?', 'MULTIPLE_CHOICE', 'sự khác biệt', 'đã hoàn thành', 'quá trình', 'kết quả', 'B', 'Từ “completed” có nghĩa là: đã hoàn thành.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘ongoing’ là gì?', 'MULTIPLE_CHOICE', 'đang tiếp diễn', 'đã hoàn thành', 'sự khác biệt', 'quá trình', 'A', 'Từ “ongoing” có nghĩa là: đang tiếp diễn.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘difference’ là gì?', 'MULTIPLE_CHOICE', 'đã hoàn thành', 'sự khác biệt', 'kết quả', 'đang tiếp diễn', 'B', 'Từ “difference” có nghĩa là: sự khác biệt.', 'HARD', 6, 1);

-- Lesson 3: Advanced Past Tense Review (Ôn tập các thì quá khứ)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Advanced Past Tense Review (Ôn tập các thì quá khứ)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'contrast', 'sự tương phản', '/ˈkɑːn.træst/', 'The contrast between the two tenses is clear.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'timeline', 'dòng thời gian', '/ˈtaɪm.laɪn/', 'Draw a timeline of the events.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'accuracy', 'độ chính xác', '/ˈæk.jɚ.ə.si/', 'Grammar accuracy matters in formal writing.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'fluency', 'sự lưu loát', '/ˈfluː.ən.si/', 'Practice improves fluency.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'context', 'ngữ cảnh', '/ˈkɑːn.tekst/', 'Choose the tense based on context.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'nuance', 'sắc thái', '/ˈnuː.ɑːns/', 'Each past tense has a different nuance.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Advanced Past Tense Review (Ôn tập các thì quá khứ)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘contrast’ là gì?', 'MULTIPLE_CHOICE', 'dòng thời gian', 'sự lưu loát', 'sắc thái', 'sự tương phản', 'D', 'Từ “contrast” có nghĩa là: sự tương phản.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘timeline’ là gì?', 'MULTIPLE_CHOICE', 'sắc thái', 'ngữ cảnh', 'sự lưu loát', 'dòng thời gian', 'D', 'Từ “timeline” có nghĩa là: dòng thời gian.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘accuracy’ là gì?', 'MULTIPLE_CHOICE', 'sự tương phản', 'độ chính xác', 'dòng thời gian', 'ngữ cảnh', 'B', 'Từ “accuracy” có nghĩa là: độ chính xác.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘fluency’ là gì?', 'MULTIPLE_CHOICE', 'sắc thái', 'dòng thời gian', 'sự lưu loát', 'độ chính xác', 'C', 'Từ “fluency” có nghĩa là: sự lưu loát.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘context’ là gì?', 'MULTIPLE_CHOICE', 'dòng thời gian', 'ngữ cảnh', 'sự tương phản', 'độ chính xác', 'B', 'Từ “context” có nghĩa là: ngữ cảnh.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘nuance’ là gì?', 'MULTIPLE_CHOICE', 'sắc thái', 'ngữ cảnh', 'độ chính xác', 'dòng thời gian', 'A', 'Từ “nuance” có nghĩa là: sắc thái.', 'HARD', 6, 1);

-- ==============================================================================
-- TOPIC: Environment & Society (Môi trường & Xã hội) [ADVANCED]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Environment & Society (Môi trường & Xã hội)', 'Thảo luận các vấn đề môi trường, phát triển bền vững và cách nêu quan điểm.', 'ADVANCED', 'PUBLISHED', NOW() - INTERVAL 10 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Climate Change (Biến đổi khí hậu)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Climate Change (Biến đổi khí hậu)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'emission', 'khí thải', '/iˈmɪʃ.ən/', 'Countries must reduce carbon emissions.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'carbon footprint', 'dấu chân carbon', '/ˈkɑːr.bən ˈfʊt.prɪnt/', 'Flying increases your carbon footprint.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'renewable', 'tái tạo', '/rɪˈnuː.ə.bəl/', 'Solar power is a renewable energy source.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'drought', 'hạn hán', '/draʊt/', 'The drought lasted for months.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'consequence', 'hậu quả', '/ˈkɑːn.sə.kwens/', 'Climate change has serious consequences.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'mitigate', 'giảm nhẹ', '/ˈmɪt̬.ə.ɡeɪt/', 'We must mitigate the effects of pollution.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Climate Change (Biến đổi khí hậu)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘emission’ là gì?', 'MULTIPLE_CHOICE', 'hậu quả', 'khí thải', 'dấu chân carbon', 'tái tạo', 'B', 'Từ “emission” có nghĩa là: khí thải.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘carbon footprint’ là gì?', 'MULTIPLE_CHOICE', 'khí thải', 'hạn hán', 'dấu chân carbon', 'tái tạo', 'C', 'Từ “carbon footprint” có nghĩa là: dấu chân carbon.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘renewable’ là gì?', 'MULTIPLE_CHOICE', 'tái tạo', 'khí thải', 'giảm nhẹ', 'hậu quả', 'A', 'Từ “renewable” có nghĩa là: tái tạo.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘drought’ là gì?', 'MULTIPLE_CHOICE', 'hậu quả', 'tái tạo', 'hạn hán', 'khí thải', 'C', 'Từ “drought” có nghĩa là: hạn hán.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘consequence’ là gì?', 'MULTIPLE_CHOICE', 'tái tạo', 'khí thải', 'dấu chân carbon', 'hậu quả', 'D', 'Từ “consequence” có nghĩa là: hậu quả.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘mitigate’ là gì?', 'MULTIPLE_CHOICE', 'khí thải', 'giảm nhẹ', 'hậu quả', 'dấu chân carbon', 'B', 'Từ “mitigate” có nghĩa là: giảm nhẹ.', 'HARD', 6, 1);

-- Lesson 2: Sustainability (Phát triển bền vững)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Sustainability (Phát triển bền vững)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'sustainability', 'sự bền vững', '/səˌsteɪ.nəˈbɪl.ə.t̬i/', 'Sustainability is a key business goal.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'biodiversity', 'đa dạng sinh học', '/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/', 'The forest is rich in biodiversity.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'conservation', 'bảo tồn', '/ˌkɑːn.sɚˈveɪ.ʃən/', 'Wildlife conservation needs public support.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'ecosystem', 'hệ sinh thái', '/ˈiː.koʊˌsɪs.təm/', 'The coral reef is a fragile ecosystem.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'consumption', 'tiêu thụ', '/kənˈsʌmp.ʃən/', 'Energy consumption rises every year.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'recycle', 'tái chế', '/ˌriːˈsaɪ.kəl/', 'We recycle plastic and paper.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Sustainability (Phát triển bền vững)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘sustainability’ là gì?', 'MULTIPLE_CHOICE', 'tiêu thụ', 'hệ sinh thái', 'tái chế', 'sự bền vững', 'D', 'Từ “sustainability” có nghĩa là: sự bền vững.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘biodiversity’ là gì?', 'MULTIPLE_CHOICE', 'sự bền vững', 'đa dạng sinh học', 'tiêu thụ', 'hệ sinh thái', 'B', 'Từ “biodiversity” có nghĩa là: đa dạng sinh học.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘conservation’ là gì?', 'MULTIPLE_CHOICE', 'đa dạng sinh học', 'bảo tồn', 'tái chế', 'hệ sinh thái', 'B', 'Từ “conservation” có nghĩa là: bảo tồn.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘ecosystem’ là gì?', 'MULTIPLE_CHOICE', 'tái chế', 'bảo tồn', 'hệ sinh thái', 'đa dạng sinh học', 'C', 'Từ “ecosystem” có nghĩa là: hệ sinh thái.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘consumption’ là gì?', 'MULTIPLE_CHOICE', 'bảo tồn', 'đa dạng sinh học', 'tiêu thụ', 'sự bền vững', 'C', 'Từ “consumption” có nghĩa là: tiêu thụ.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘recycle’ là gì?', 'MULTIPLE_CHOICE', 'đa dạng sinh học', 'tái chế', 'tiêu thụ', 'bảo tồn', 'B', 'Từ “recycle” có nghĩa là: tái chế.', 'HARD', 6, 1);

-- Lesson 3: Debate & Opinion (Tranh luận và nêu quan điểm)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Debate & Opinion (Tranh luận và nêu quan điểm)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'argue', 'tranh luận', '/ˈɑːr.ɡjuː/', 'She argued that the plan was too expensive.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'evidence', 'bằng chứng', '/ˈev.ə.dəns/', 'The report provides strong evidence.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'perspective', 'quan điểm', '/pɚˈspek.tɪv/', 'Try to see the issue from another perspective.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'controversy', 'sự tranh cãi', '/ˈkɑːn.trə.vɝː.si/', 'The policy caused great controversy.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'consensus', 'đồng thuận', '/kənˈsen.səs/', 'The group reached a consensus.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'advocate', 'ủng hộ', '/ˈæd.və.keɪt/', 'Many experts advocate stricter rules.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Debate & Opinion (Tranh luận và nêu quan điểm)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘argue’ là gì?', 'MULTIPLE_CHOICE', 'tranh luận', 'bằng chứng', 'đồng thuận', 'sự tranh cãi', 'A', 'Từ “argue” có nghĩa là: tranh luận.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘evidence’ là gì?', 'MULTIPLE_CHOICE', 'quan điểm', 'ủng hộ', 'sự tranh cãi', 'bằng chứng', 'D', 'Từ “evidence” có nghĩa là: bằng chứng.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘perspective’ là gì?', 'MULTIPLE_CHOICE', 'ủng hộ', 'sự tranh cãi', 'quan điểm', 'đồng thuận', 'C', 'Từ “perspective” có nghĩa là: quan điểm.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘controversy’ là gì?', 'MULTIPLE_CHOICE', 'tranh luận', 'ủng hộ', 'bằng chứng', 'sự tranh cãi', 'D', 'Từ “controversy” có nghĩa là: sự tranh cãi.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘consensus’ là gì?', 'MULTIPLE_CHOICE', 'sự tranh cãi', 'đồng thuận', 'tranh luận', 'ủng hộ', 'B', 'Từ “consensus” có nghĩa là: đồng thuận.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘advocate’ là gì?', 'MULTIPLE_CHOICE', 'tranh luận', 'đồng thuận', 'ủng hộ', 'quan điểm', 'C', 'Từ “advocate” có nghĩa là: ủng hộ.', 'HARD', 6, 1);

-- ==============================================================================
-- TOPIC: Business English & Negotiation (Tiếng Anh thương mại & Đàm phán) [ADVANCED]
-- ==============================================================================
INSERT INTO topics (teacher_id, title, description, level, status, created_at) VALUES (1, 'Business English & Negotiation (Tiếng Anh thương mại & Đàm phán)', 'Ngôn ngữ họp, đàm phán và thuyết trình trong môi trường doanh nghiệp.', 'ADVANCED', 'PUBLISHED', NOW() - INTERVAL 11 MINUTE);
SET @topic_id = LAST_INSERT_ID();

-- Lesson 1: Business Meetings (Cuộc họp doanh nghiệp)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Business Meetings (Cuộc họp doanh nghiệp)', 1, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'agenda', 'chương trình họp', '/əˈdʒen.də/', 'Let''s start with the first item on the agenda.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'minutes', 'biên bản', '/ˈmɪn.ɪts/', 'Who is taking the minutes today?');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'consensus', 'đồng thuận', '/kənˈsen.səs/', 'We need a consensus before deciding.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'proposal', 'đề xuất', '/prəˈpoʊ.zəl/', 'The proposal was accepted by the board.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'stakeholder', 'bên liên quan', '/ˈsteɪkˌhoʊl.dɚ/', 'All stakeholders were invited.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'adjourn', 'tạm hoãn', '/əˈdʒɝːn/', 'The meeting was adjourned until Monday.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Business Meetings (Cuộc họp doanh nghiệp)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘agenda’ là gì?', 'MULTIPLE_CHOICE', 'bên liên quan', 'đồng thuận', 'đề xuất', 'chương trình họp', 'D', 'Từ “agenda” có nghĩa là: chương trình họp.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘minutes’ là gì?', 'MULTIPLE_CHOICE', 'biên bản', 'đề xuất', 'đồng thuận', 'chương trình họp', 'A', 'Từ “minutes” có nghĩa là: biên bản.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘consensus’ là gì?', 'MULTIPLE_CHOICE', 'bên liên quan', 'đồng thuận', 'tạm hoãn', 'đề xuất', 'B', 'Từ “consensus” có nghĩa là: đồng thuận.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘proposal’ là gì?', 'MULTIPLE_CHOICE', 'tạm hoãn', 'chương trình họp', 'đề xuất', 'bên liên quan', 'C', 'Từ “proposal” có nghĩa là: đề xuất.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘stakeholder’ là gì?', 'MULTIPLE_CHOICE', 'đề xuất', 'chương trình họp', 'biên bản', 'bên liên quan', 'D', 'Từ “stakeholder” có nghĩa là: bên liên quan.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘adjourn’ là gì?', 'MULTIPLE_CHOICE', 'tạm hoãn', 'chương trình họp', 'đề xuất', 'bên liên quan', 'A', 'Từ “adjourn” có nghĩa là: tạm hoãn.', 'HARD', 6, 1);

-- Lesson 2: Negotiation Skills (Kỹ năng đàm phán)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Negotiation Skills (Kỹ năng đàm phán)', 2, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'negotiate', 'đàm phán', '/nɪˈɡoʊ.ʃi.eɪt/', 'We negotiated a better price.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'compromise', 'thỏa hiệp', '/ˈkɑːm.prə.maɪz/', 'Both sides agreed to compromise.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'leverage', 'lợi thế', '/ˈlev.ɚ.ɪdʒ/', 'Their experience gave them leverage.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'concession', 'nhượng bộ', '/kənˈseʃ.ən/', 'Each side made a small concession.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'contract', 'hợp đồng', '/ˈkɑːn.trækt/', 'They signed the contract yesterday.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'mutual', 'lẫn nhau', '/ˈmjuː.tʃu.əl/', 'The deal was based on mutual trust.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Negotiation Skills (Kỹ năng đàm phán)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘negotiate’ là gì?', 'MULTIPLE_CHOICE', 'đàm phán', 'lợi thế', 'thỏa hiệp', 'hợp đồng', 'A', 'Từ “negotiate” có nghĩa là: đàm phán.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘compromise’ là gì?', 'MULTIPLE_CHOICE', 'thỏa hiệp', 'lẫn nhau', 'hợp đồng', 'nhượng bộ', 'A', 'Từ “compromise” có nghĩa là: thỏa hiệp.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘leverage’ là gì?', 'MULTIPLE_CHOICE', 'lẫn nhau', 'đàm phán', 'lợi thế', 'hợp đồng', 'C', 'Từ “leverage” có nghĩa là: lợi thế.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘concession’ là gì?', 'MULTIPLE_CHOICE', 'nhượng bộ', 'lợi thế', 'lẫn nhau', 'thỏa hiệp', 'A', 'Từ “concession” có nghĩa là: nhượng bộ.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘contract’ là gì?', 'MULTIPLE_CHOICE', 'hợp đồng', 'lẫn nhau', 'đàm phán', 'nhượng bộ', 'A', 'Từ “contract” có nghĩa là: hợp đồng.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘mutual’ là gì?', 'MULTIPLE_CHOICE', 'đàm phán', 'thỏa hiệp', 'lẫn nhau', 'nhượng bộ', 'C', 'Từ “mutual” có nghĩa là: lẫn nhau.', 'HARD', 6, 1);

-- Lesson 3: Presentations (Thuyết trình)
INSERT INTO lessons (topic_id, title, order_index, completion_threshold, status) VALUES (@topic_id, 'Presentations (Thuyết trình)', 3, 80.00, 'PUBLISHED');
SET @lesson_id = LAST_INSERT_ID();
INSERT INTO lesson_materials (lesson_id, type, file_url) VALUES (@lesson_id, 'VIDEO', '/api/v1/files/443924bf-fc2a-41b0-944c-f983aec7f63d.mp4');
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'audience', 'khán giả', '/ˈɑː.di.əns/', 'The audience asked many questions.');
SET @v1 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'highlight', 'nhấn mạnh', '/ˈhaɪ.laɪt/', 'Let me highlight the key figures.');
SET @v2 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'visual', 'hình ảnh trực quan', '/ˈvɪʒ.u.əl/', 'Use visuals to support your message.');
SET @v3 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'persuasive', 'có tính thuyết phục', '/pɚˈsweɪ.sɪv/', 'Her argument was very persuasive.');
SET @v4 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'concise', 'ngắn gọn', '/kənˈsaɪs/', 'Keep your slides concise.');
SET @v5 = LAST_INSERT_ID();
INSERT INTO vocabulary_items (lesson_id, word, meaning, pronunciation, example) VALUES (@lesson_id, 'conclude', 'kết luận', '/kənˈkluːd/', 'I will conclude with a short summary.');
SET @v6 = LAST_INSERT_ID();
INSERT INTO minigames (lesson_id, title, status) VALUES (@lesson_id, 'Ôn tập từ vựng – Presentations (Thuyết trình)', 'PUBLISHED');
SET @game_id = LAST_INSERT_ID();
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v1, 'Nghĩa của từ ‘audience’ là gì?', 'MULTIPLE_CHOICE', 'ngắn gọn', 'hình ảnh trực quan', 'khán giả', 'kết luận', 'C', 'Từ “audience” có nghĩa là: khán giả.', 'HARD', 1, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v2, 'Nghĩa của từ ‘highlight’ là gì?', 'MULTIPLE_CHOICE', 'hình ảnh trực quan', 'khán giả', 'nhấn mạnh', 'kết luận', 'C', 'Từ “highlight” có nghĩa là: nhấn mạnh.', 'HARD', 2, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v3, 'Nghĩa của từ ‘visual’ là gì?', 'MULTIPLE_CHOICE', 'hình ảnh trực quan', 'nhấn mạnh', 'có tính thuyết phục', 'khán giả', 'A', 'Từ “visual” có nghĩa là: hình ảnh trực quan.', 'HARD', 3, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v4, 'Nghĩa của từ ‘persuasive’ là gì?', 'MULTIPLE_CHOICE', 'hình ảnh trực quan', 'ngắn gọn', 'có tính thuyết phục', 'kết luận', 'C', 'Từ “persuasive” có nghĩa là: có tính thuyết phục.', 'HARD', 4, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v5, 'Nghĩa của từ ‘concise’ là gì?', 'MULTIPLE_CHOICE', 'kết luận', 'ngắn gọn', 'có tính thuyết phục', 'nhấn mạnh', 'B', 'Từ “concise” có nghĩa là: ngắn gọn.', 'HARD', 5, 1);
INSERT INTO minigame_questions (minigame_id, vocab_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, question_order, is_active) VALUES (@game_id, @v6, 'Nghĩa của từ ‘conclude’ là gì?', 'MULTIPLE_CHOICE', 'kết luận', 'khán giả', 'nhấn mạnh', 'có tính thuyết phục', 'A', 'Từ “conclude” có nghĩa là: kết luận.', 'HARD', 6, 1);

-- Tong: 12 topics, 37 lessons, 222 vocabulary items
