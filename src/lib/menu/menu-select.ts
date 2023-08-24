import { select } from '@clack/prompts';
import { ACTION, CUSTOM_MAX_WIDTH_TRESHOLD, DEFAULT_MAX_WIDTH_TRESHOLD, WIDTH_THRESHOLD, type Action, type WidthThreshold } from '../models/lib.model';
import { menuInputNumber } from './menu-input';
import { checkCancel } from './menu-misc';

export async function menuSelectAction(): Promise<Action> {
  const action: Action | symbol = await select({
    message: 'What action would you like to take?',
    options: [
      {
        value: ACTION.CONVERT_IMAGE,
        label: 'Convert image(s)',
        hint: 'It will optimize the original image(s) and create the associated converted image(s) with the provided dimension(s)',
      },
      { value: ACTION.OPTIMIZE_IMAGE, label: 'Optimize image(s)', hint: 'Optimize quality, size & metadatas' },
    ],
  });

  checkCancel(action);

  return action as Action;
}

export async function menuSelectMaxWidth(): Promise<number> {
  let maxWidth: number | symbol = await select({
    message: 'Select the max width of the optimized image(s) (default: 1920)',
    initialValue: DEFAULT_MAX_WIDTH_TRESHOLD,
    options: Object.values(WIDTH_THRESHOLD).map((widthValue: WidthThreshold) => {
      if (widthValue === CUSTOM_MAX_WIDTH_TRESHOLD) {
        return { label: 'Custom max width', value: widthValue };
      }

      if (widthValue === DEFAULT_MAX_WIDTH_TRESHOLD) {
        return { value: widthValue, hint: 'default' };
      }

      return { value: widthValue };
    }),
  });

  checkCancel(maxWidth);

  // Custom width
  if ((maxWidth as number) === CUSTOM_MAX_WIDTH_TRESHOLD) {
    maxWidth = await menuInputNumber();
  }

  return maxWidth as number;
}
