# GitHub Repo Explorer

A modern web application for exploring GitHub repositories with an intuitive interface and powerful search capabilities.

## 🚀 Features

- **Repository Search**: Search GitHub repositories by name, description, or topic
- **Advanced Filtering**: Filter by language, stars, forks, and last updated date
- **Repository Details**: View comprehensive repository information including:
  - Stars, forks, and watchers count
  - Primary language and language breakdown
  - Recent commits and contributors
  - Issues and pull requests
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Bookmarking**: Save favorite repositories for quick access


## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **API**: GitHub REST API v4
- **Build Tool**: Vite
- **Deployment**: Vercel / render

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- GitHub Personal Access Token (for API access)

## ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fathima-nihala/github-repo-explorer.git
   cd github-repo-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GITHUB_TOKEN=your_github_personal_access_token
   VITE_API_BASE_URL=https://api.github.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## 🔑 Getting a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name
4. Select the following scopes:
   - `public_repo` (to access public repositories)
   - `read:user` (to read user profile information)
5. Click "Generate token"
6. Copy the token and add it to your `.env.local` file

## 📖 Usage

### Basic Search
1. Enter a repository name or keyword in the search bar
2. Press Enter or click the search button
3. Browse through the results

### Advanced Search
- Use the filter sidebar to narrow down results by:
  - Programming language
  - Number of stars (minimum)
  - Last updated date
  - Repository size

### Viewing Repository Details
- Click on any repository card to view detailed information
- Explore tabs for code, issues, pull requests, and contributors

### Bookmarking
- Click the bookmark icon on any repository to save it
- Access saved repositories from the bookmarks page

## 🚀 Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory, ready for deployment.



## 🔧 Configuration

### API Rate Limits
The GitHub API has rate limits:
- **Authenticated requests**: 5,000 per hour
- **Unauthenticated requests**: 60 per hour

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GITHUB_TOKEN` | GitHub Personal Access Token | Yes |
| `VITE_API_BASE_URL` | GitHub API base URL | No |



### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting


  ## Login


- **Email**: niha@example.com
- **Password**: 123456



## 📧 Contact

- **Author**: Fathima Nihala
- **Email**: nihalafathima547@gmail.com
- **GitHub**: [@fathima-nihala](https://github.com/fathima-nihala)
- **LinkedIn**: [Fathima Nihala A T ](https://linkedin.com/in/nihaaa)

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All contributors who help improve this project

---

**⭐ If you found this project helpful, please consider giving it a star!**
