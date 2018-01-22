import Plusnew from 'index';
import component from 'interfaces/component';

describe('rendering the elements', () => {
  let plusnew: Plusnew;
  let container: HTMLElement;
  beforeEach(() => {
    plusnew = new Plusnew();
    container = document.createElement('div');
    container.innerHTML = 'lots of stuff';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('check if element is inserted', () => {
    const component: component<{}> = () => {
      return {
        render: () => <div className="foo" />,
        dependencies: {},
      };
    };
    plusnew.render(component, container);
    expect(container.childNodes.length).toBe(1);
    const target = container.childNodes[0] as HTMLElement;
    expect(target.nodeName).toBe('DIV');
    expect(target.className).toBe('foo');
  });

  it('check if elements are inserted', () => {
    const component: component<{}> = () => {
      return {
        render: () => [
          <div className="foo" />,
          <span className="bar" />,
        ],
        dependencies: {},
      };
    };

    plusnew.render(component, container);
    expect(container.childNodes.length).toBe(2);

    const firstTarget = container.childNodes[0] as HTMLElement;
    expect(firstTarget.nodeName).toBe('DIV');
    expect(firstTarget.className).toBe('foo');

    const secondTarget = container.childNodes[1] as HTMLElement;
    expect(secondTarget.nodeName).toBe('SPAN');
    expect(secondTarget.className).toBe('bar');
  });

  it('check if nesting works', () => {
    const component: component<{}> = () => {
      return {
        render: () => <div className="foo"><span className="bar" /></div>,
        dependencies: {},
      };
    };

    plusnew.render(component, container);
    expect(container.childNodes.length).toBe(1);
    const target = container.childNodes[0] as HTMLElement;
    expect(target.nodeName).toBe('DIV');
    expect(target.className).toBe('foo');
    expect(target.innerHTML).toBe('<span class="bar"></span>');
  });

  it('check if textnode is created', () => {
    const component: component<{}> = () => {
      return {
        render: () => <div className="foo">bar</div>,
        dependencies: {},
      };
    };

    plusnew.render(component, container);
    expect(container.childNodes.length).toBe(1);
    const target = container.childNodes[0] as HTMLElement;
    expect(target.nodeName).toBe('DIV');
    expect(target.className).toBe('foo');
    expect(target.innerHTML).toBe('bar');
  });

  it('check if textnode is created on root', () => {
    const component = () => {
      return {
        render: () => 'foo',
        dependencies: {},
      };
    };

    plusnew.render(component, container);
    expect(container.childNodes.length).toBe(1);
    expect(container.innerHTML).toBe('foo');
  });

  it('check if textnode is created on root, even with number', () => {
    const component = () => {
      return {
        render: () => 1,
        dependencies: {},
      };
    };

    plusnew.render(component, container);
    expect(container.childNodes.length).toBe(1);
    expect(container.innerHTML).toBe('1');
  });
});