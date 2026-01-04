/**
 * Export the commitlint configuration using CommonJS.
 * This format works in all Node environments and CI systems
 * without requiring "type": "module" in package.json.
 *
 * https://commitlint.js.org/reference/rules.html
 */
module.exports = {
  /**
   * Extend the official Conventional Commits ruleset.
   *
   * This provides the base rules for:
   * - Commit header format: <type>(<scope>): <subject>
   * - Allowed breaking change syntax
   * - Optional body and footer
   *
   * semantic-release understands this format natively.
   */
  extends: ['@commitlint/config-conventional'],

  /**
   * Custom rules override or refine the defaults.
   *
   * Each rule follows this structure:
   * [severity, condition, value]
   *
   * severity:
   *   0 = disabled
   *   1 = warning
   *   2 = error (blocks the PR)
   */
  rules: {
    /**
     * Disallow empty commit types.
     *
     * Ensures commits always start with a type like:
     * feat:, fix:, docs:, chore:, etc.
     */
    'type-empty': [2, 'never'],

    /**
     * Restrict commit types to a known, approved list.
     *
     * Prevents ambiguous or non-standard types like:
     * - update:
     * - bugfix:
     * - misc:
     *
     * This keeps commit history predictable and readable.
     */
    'type-enum': [
      2,            // Error if violated
      'always',     // The type must be one of the values below
      [
        'feat',     // New user-facing features → minor release
        'fix',      // Bug fixes → patch release
        'docs',     // Documentation-only changes
        'style',    // Formatting changes (no logic impact)
        'refactor', // Code refactors (no behavior change)
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system or dependency changes
        'ci',       // CI/CD configuration changes
        'chore',    // Maintenance tasks
        'revert'    // Reverts of previous commits
      ]
    ],

    /**
     * Disallow empty commit subjects.
     *
     * Prevents commits like:
     * feat:
     */
    'subject-empty': [2, 'never'],

    /**
     * Enforce sentence-case for the subject line.
     *
     * Example:
     * ✔ fix: Handle null token
     * ✖ fix: handle null token
     *
     * This improves readability in changelogs.
     */
    'subject-case': [2, 'always', ['sentence-case']],

    /**
     * Limit the commit header length.
     *
     * 72 characters is a widely accepted standard that:
     * - Displays well in GitHub
     * - Prevents overly verbose titles
     */
    'header-max-length': [2, 'always', 72],

    /**
     * Allow commits without a scope.
     *
     * Example:
     * ✔ fix: Correct typo
     * ✔ fix(auth): Correct token handling
     *
     * Scopes are useful but optional.
     */
    'scope-empty': [0],

    /**
     * Disable body line length checks.
     *
     * The body is often used to:
     * - List multiple fixes
     * - Explain context
     * - Provide migration notes
     *
     * Enforcing line length here is unnecessary friction.
     */
    'body-max-line-length': [0],

    /**
     * Disable footer line length checks.
     *
     * Footers may contain:
     * - BREAKING CHANGE notes
     * - Issue references
     * - Release metadata
     *
     * These should not block merges.
     */
    'footer-max-line-length': [0],
  },
};
