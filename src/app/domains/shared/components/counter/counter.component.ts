import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: any;

  constructor() {
    // NO ASYNC OPERATIONS IN CONSTRUCTOR
    // before rendering the component, runs once
    console.log('CounterComponent constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during rendering the component
    console.log('CounterComponent ngOnChanges');
    console.log('changes', changes);
    console.log('-'.repeat(10));
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // after rendering the component, runs once, async operations, http requests etc.
    console.log('CounterComponent ngOnInit');
    console.log('duration', this.duration);
    console.log('message', this.message);
    console.log('-'.repeat(10));
    this.counterRef = setInterval(() => {
      console.log('CounterComponent setInterval');
      this.counter.update((value) => value + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // after rendering the component, to know if the children of this component are rendered, runs once
    console.log('CounterComponent ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // before destroying the component
    console.log('CounterComponent ngOnDestroy');
    console.log('-'.repeat(10));
    if (this.counterRef) {
      clearInterval(this.counterRef);
    }
  }

  doSomething() {
    console.log('CounterComponent doSomething');
    console.log('-'.repeat(10));
  }
}
