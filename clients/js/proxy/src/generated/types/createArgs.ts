/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Serializer, bool, struct } from '@metaplex-foundation/umi/serializers';

export type CreateArgs = { isCollection: boolean };

export type CreateArgsArgs = CreateArgs;

export function getCreateArgsSerializer(): Serializer<
  CreateArgsArgs,
  CreateArgs
> {
  return struct<CreateArgs>([['isCollection', bool()]], {
    description: 'CreateArgs',
  }) as Serializer<CreateArgsArgs, CreateArgs>;
}
