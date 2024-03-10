const express = require("express")
const router= express.Router()
const {authenticateToken} = require("../auth/jwebUser")
const {getBlogs, getOneBlog,commentBlog} = require("../controllers/blogsControllers")
/**
 * @swagger
 * tags:
 *   name: BlogsUser
 *   description: API endpoints for managing blog posts
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve all blog posts.
 *     responses:
 *       200:
 *         description: Blog posts retrieved successfully.
 */

router.get("/", getBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog post by ID
 *     description: Retrieve the content and details of a single blog post by providing its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully.
 *       404:
 *         description: Blog post not found.
 */

router.get("/:id", getOneBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   post:
 *     summary: Add a comment to a blog post
 *     description: Add a comment to a specific blog post by providing its ID in the URL and the comment content in the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to comment on.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Blog post not found.
 */

router.post("/:id", authenticateToken, commentBlog);

module.exports = router;
