/**
 * Dinh nghia kieu du lieu bang JSDoc — duoc Pylance/TypeScript doc lai khi can.
 * Neu sau nay chuyen sang TypeScript, doi file nay thanh `models.ts`.
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'beginner'|'intermediate'|'advanced'} [level]
 * @property {string} [avatarUrl]
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {'beginner'|'intermediate'|'advanced'} level
 * @property {number} durationMinutes
 * @property {boolean} [completed]
 */

/**
 * @typedef {Object} VocabularyItem
 * @property {string} id
 * @property {string} word
 * @property {string} meaning
 * @property {string} [phonetic]
 * @property {string[]} [examples]
 */

/**
 * @typedef {Object} PracticeSession
 * @property {string} id
 * @property {string} lessonId
 * @property {number} score
 * @property {number} total
 * @property {string} startedAt
 * @property {string} [finishedAt]
 */

/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {T} data
 * @property {string} [message]
 */

export {};
