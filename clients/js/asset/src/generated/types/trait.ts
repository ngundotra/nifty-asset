/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Serializer,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';

export type Trait = { name: string; value: string };

export type TraitArgs = Trait;

export function getTraitSerializer(): Serializer<TraitArgs, Trait> {
  return struct<Trait>(
    [
      ['name', string({ size: u8() })],
      ['value', string({ size: u8() })],
    ],
    { description: 'Trait' }
  ) as Serializer<TraitArgs, Trait>;
}
