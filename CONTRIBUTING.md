# Contributing to BharatBillGen

Thank you for your interest in contributing to BharatBillGen! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Issues
1. Check existing issues to avoid duplicates
2. Use the issue template when creating new issues
3. Provide detailed information about the bug or feature request
4. Include screenshots or screen recordings when applicable

### Submitting Pull Requests
1. Fork the repository
2. Create a new branch for your feature/fix
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Submit a pull request with a clear description

## 🛠 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/bharat-bill-gen.git
cd bharat-bill-gen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary

### React Components
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design for all components

### File Organization
- Keep components in separate files
- Use descriptive file and folder names
- Follow the existing project structure

## 🎨 Design Guidelines

### UI/UX
- Maintain consistency with existing design
- Ensure accessibility (WCAG 2.1 AA)
- Test on multiple devices and browsers
- Follow mobile-first approach

### Themes
- New themes should be professional and business-appropriate
- Ensure good contrast ratios for readability
- Test themes in both light and dark modes

## 🧪 Testing

### Manual Testing
- Test all features thoroughly
- Verify GST calculations are accurate
- Test PDF generation and quality
- Check responsive design on different devices

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project standards
- [ ] All features work as expected
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] PDF generation works correctly
- [ ] GST calculations are accurate

### PR Description
Include:
- Clear description of changes
- Screenshots/videos of new features
- Any breaking changes
- Testing instructions

## 🌍 Internationalization

### Adding New Languages
1. Add language code to `LanguageContext.tsx`
2. Add translations to the translations object
3. Test all UI elements with new language
4. Ensure proper text direction (LTR/RTL)

### Translation Guidelines
- Keep translations concise and professional
- Maintain consistency in terminology
- Consider cultural context
- Test with longer text strings

## 🔒 Security Guidelines

### Data Privacy
- Never add server-side data collection
- Maintain client-side only architecture
- Respect user privacy
- No tracking or analytics without consent

### Code Security
- Sanitize user inputs
- Avoid XSS vulnerabilities
- Use secure coding practices
- Review dependencies for vulnerabilities

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props and interfaces
- Include usage examples where helpful

### User Documentation
- Update README.md for new features
- Add to user guide if applicable
- Include screenshots for UI changes

## 🎯 Feature Requests

### Before Requesting
- Check existing issues and roadmap
- Consider if it fits the project scope
- Think about implementation complexity

### Feature Proposal
Include:
- Clear use case and benefits
- Detailed description
- Mockups or wireframes (if UI change)
- Implementation suggestions

## 🚀 Release Process

### Version Numbering
- Follow semantic versioning (SemVer)
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Notes
- Document all changes
- Include migration guides for breaking changes
- Credit contributors

## 💬 Community Guidelines

### Communication
- Be respectful and professional
- Help other contributors
- Share knowledge and best practices
- Provide constructive feedback

### Code of Conduct
- Treat everyone with respect
- Be inclusive and welcoming
- Focus on constructive collaboration
- Report inappropriate behavior

## 📞 Getting Help

### Questions
- Check existing documentation first
- Search closed issues for answers
- Ask in GitHub discussions
- Contact maintainers if needed

### Contact
- Email: contactsweatandcode@gmail.com
- LinkedIn: [Kartik Singh](https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D)

## 🏆 Recognition

Contributors will be:
- Listed in the README.md
- Credited in release notes
- Mentioned in social media posts
- Invited to join the core team (for significant contributions)

Thank you for contributing to BharatBillGen! 🙏

---

**Made with ❤️ by the BharatBillGen community**