// Load all *.spec.ts files under the app directory.
// Note, this allows all unit test spec files to reside in the same directory as their target components.
const context = (require as any).context('./app', true, /\.spec\.ts$/);
context.keys().map(context);
