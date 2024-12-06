# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for
receiving such patches depends on the CVSS v3.0 Rating:

| CVSS v3.0 | Supported Versions                        |
| --------- | ---------------------------------------- |
| 9.0-10.0  | Releases within the previous three months |
| 4.0-8.9   | Most recent release                      |

## Reporting a Vulnerability

Please report security vulnerabilities through our [security advisories](https://github.com/your-org/your-repo/security/advisories/new).

We will acknowledge your report within 48 hours, and send a more detailed response
within 72 hours indicating the next steps in handling your report.

After the initial reply to your report, we will endeavor to keep you informed of
the progress towards a fix and full announcement, and may ask for additional
information or guidance.

## Security Measures

1. **Environment Variables**
   - All sensitive configuration is managed through environment variables
   - Environment variables are validated at runtime
   - Templates do not contain real secrets

2. **Dependencies**
   - Regular security audits with `npm audit`
   - Automated dependency updates with Dependabot
   - Lock files are committed to repository

3. **Code Security**
   - TypeScript for type safety
   - ESLint security plugins
   - Automated testing
   - Code review requirements

4. **Infrastructure**
   - HTTPS everywhere
   - Regular security updates
   - Access control and authentication
   - Logging and monitoring

## Best Practices

1. Never commit sensitive information
2. Keep dependencies up to date
3. Follow security advisories
4. Use strong authentication
5. Implement proper error handling
6. Regular security reviews
