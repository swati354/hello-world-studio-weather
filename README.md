# Hello World UiPath App

A modern, production-ready UiPath Coded Web Application built with React, TypeScript, and Tailwind CSS. This application demonstrates seamless integration with UiPath Orchestrator services using the official UiPath TypeScript SDK.

[cloudflarebutton]

## Features

- **UiPath SDK Integration**: Pre-configured authentication and service access
- **Modern Tech Stack**: React 18, TypeScript, Vite 6, Tailwind CSS 4
- **OAuth 2.0 PKCE Authentication**: Secure user authentication with UiPath
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Type-Safe Development**: Full TypeScript support with strict type checking
- **Fast Development**: Hot module replacement with Vite
- **Production Ready**: Optimized build configuration for deployment

## Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.1
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript 5.8
- **Routing**: React Router DOM 6.30
- **UiPath SDK**: @uipath/uipath-typescript (latest)
- **Deployment**: Cloudflare Pages

## Prerequisites

- [Bun](https://bun.sh/) runtime installed
- UiPath account with appropriate OAuth credentials
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
bun install
```

3. Configure environment variables:

The `.env` file is pre-configured with UiPath OAuth settings. Update if needed:

```env
VITE_UIPATH_BASE_URL=https://staging.api.uipath.com
VITE_UIPATH_ORG_NAME=your-org-name
VITE_UIPATH_TENANT_NAME=your-tenant-name
VITE_UIPATH_CLIENT_ID=your-client-id
VITE_UIPATH_SCOPE=OR.Administration.Read OR.Assets.Read OR.Execution.Read OR.Folders OR.Jobs OR.Queues.Read OR.Tasks PIMS Traces.Api DataFabric.Data.Read DataFabric.Data.Write DataFabric.Schema.Read ConversationalAgents
```

## Development

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`

### Development Features

- **Hot Module Replacement**: Changes reflect instantly without full page reload
- **TypeScript Type Checking**: Real-time type validation
- **ESLint Integration**: Code quality checks on save
- **React Strict Mode**: Enhanced development warnings and checks

## Project Structure

```
├── src/
│   ├── hooks/
│   │   └── useAuth.tsx          # OAuth authentication hook
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── .env                         # Environment configuration
├── uipath.json                  # UiPath app configuration
├── vite.config.ts               # Vite build configuration
└── package.json                 # Project dependencies
```

## Usage

### Authentication

The application uses OAuth 2.0 PKCE flow for secure authentication:

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, isLoading, sdk, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={login}>Sign in with UiPath</button>;
  }

  // Use sdk to interact with UiPath services
  return <div>Authenticated content</div>;
}
```

### Using UiPath Services

```typescript
import { useAuth } from '@/hooks/useAuth';
import { Assets } from '@uipath/uipath-typescript/assets';
import { useMemo } from 'react';

function AssetsComponent() {
  const { sdk } = useAuth();
  const assets = useMemo(() => new Assets(sdk), [sdk]);

  // Fetch and display assets
  // ...
}
```

## Building for Production

Create an optimized production build:

```bash
bun run build
```

The build output will be in the `dist/` directory.

Preview the production build locally:

```bash
bun run preview
```

## Deployment

### Cloudflare Pages

This application is configured for deployment on Cloudflare Pages.

[cloudflarebutton]

#### Manual Deployment

1. Build the application:

```bash
bun run build
```

2. Deploy using Wrangler:

```bash
bunx wrangler pages deploy dist
```

#### Configuration

The `wrangler.jsonc` file contains the deployment configuration:

```jsonc
{
  "name": "uipath-dashboard",
  "compatibility_date": "2025-01-01",
  "pages_build_output_dir": "dist"
}
```

#### Environment Variables

Set the following environment variables in your Cloudflare Pages project settings:

- `VITE_UIPATH_BASE_URL`
- `VITE_UIPATH_ORG_NAME`
- `VITE_UIPATH_TENANT_NAME`
- `VITE_UIPATH_CLIENT_ID`
- `VITE_UIPATH_SCOPE`

## Code Quality

Run ESLint to check code quality:

```bash
bun run lint
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint checks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security

- OAuth 2.0 PKCE flow for secure authentication
- Tokens stored in sessionStorage
- Automatic token refresh
- No hardcoded credentials in source code

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [UiPath SDK documentation](https://docs.uipath.com/)
- Review the skill documentation in `.nucleus/plugin/skills/uipath-coded-apps/`
- Open an issue in the repository

## Acknowledgments

- Built with [UiPath TypeScript SDK](https://www.npmjs.com/package/@uipath/uipath-typescript)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)