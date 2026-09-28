import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

export class User implements UserWithoutPassword {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, nullable: true })
  telephone: string | null;

  @ApiProperty()
  firstName: string;

  @ApiProperty({ type: String, nullable: true })
  lastName: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({enum: Role})
  role: Role = "USER";
}
