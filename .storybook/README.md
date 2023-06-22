# Building components

## ExampleComponent.tsx

We tend to keep one component per file and use styled components framework to include styling to it.

```typescript
import styled from 'styled-components';

import React from 'react';

interface IExampleComponent {
  styles?: {
    width?: 'full' | 'narrow';
  };
}

export const ExampleComponent = () => {
  return (
    <StyledComponentContainer>
      <div className="some-internal-wrapper">
        <p>Text</p>
      </div>
    </StyledComponentContainer>
  );
};
```

## ExampleComponent.stories.tsx

For each separate component we may create a file next to component's file containing its stories. Then we may include also Figma page to each of created stories. We tend to keep Figma links in separate object for reusability of one link in multiple stories.

```typescript
import { FigmaUrls, includeFigma } from '../utils/story-design';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import { ExampleComponent } from './ExampleComponent';

export default {
  title: 'Menu Chapter/ExampleComponent Name',
  component: ExampleComponent,
  decorators: [withDesign],
} as ComponentMeta<typeof ExampleComponent>;

const ExampleComponentTemplate: ComponentStory<typeof ExampleComponent> = (args) => <ExampleComponent {...args} />;

export const FirstStoryOfExampleComponent = ExampleComponentTemplate.bind({});
FirstStoryOfExampleComponent.args = {
  styles: {
    width: 'narrow',
  },
};
includeFigma(FirstStoryOfExampleComponent, FigmaUrls.main);

export const AlternativeStoryOfExampleComponent = ExampleComponentTemplate.bind({});
AlternativeStoryOfExampleComponent.args = {
  styles: {
    width: 'full',
  },
};
includeFigma(AlternativeStoryOfExampleComponent, FigmaUrls.main);
```

# Using Storybook to manage components

All created stories may easily review via Storybook UI. It is separate React application just for navigating among components and stories. To run Storybook we use dedicated NPM script entry in **package.json**:

```
npm run storybook
```

Table of contents as well as general UI layout may be edited from **preview.js** file.

To capture Figma we use **Designs** Storybook addon:

https://github.com/pocka/storybook-addon-designs/tree/master/packages
