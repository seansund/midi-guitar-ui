import {Observable} from 'rxjs';
import {Chords} from '../../models/Chords';

export abstract class ChordApi {
  abstract chord(): Observable<Chords>;
}
