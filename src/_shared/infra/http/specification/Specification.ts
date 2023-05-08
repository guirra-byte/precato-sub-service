import { Injectable } from '@nestjs/common';

export interface Specification<T> {
  isSatisfiedBy(t: T): boolean;
  and(specification: Specification<T>): Specification<T>;
}

@Injectable()
export abstract class AbstractSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(t: T): boolean;
  abstract and(specification: Specification<T>): Specification<T>;
}
