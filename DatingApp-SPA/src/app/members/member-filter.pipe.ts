import {PipeTransform, Pipe} from '@angular/core';
import { User } from '../_models/user';

@Pipe({
    name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {
transform(users: User[], searchTerm: string): User[] {
    if (!users || !searchTerm) {
        return users;
    }
    return users.filter(user =>
        user.knownAs.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

}
}
