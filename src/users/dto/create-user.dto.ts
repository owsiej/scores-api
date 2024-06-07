import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Date } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  @Matches(/^[A-Z-a-z0-9]+$/, {
    message: 'Special symbols in $property are not allowed.',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(35)
  @Matches(
    /(?=.*[a-ząężźłćńśó])(?=.*[A-ZĄĘŻŹŁĆŃŚÓ])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-ząężźłćńśóĄĘŻŹŁĆŃŚÓ\d@$!#%*?&_]*/,
    {
      message:
        '$property must contain at least one small/big letter, digit and special symbol.',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;
}
