import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true, nullable: true })
    name: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    deleted: boolean

    @Column({ nullable: false })
    createdAt: Date

    @Column({ nullable: false, onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date
}