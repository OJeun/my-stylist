import Button from '../../components/ui/Button';

export default function LandingComponent() {
  return (
    <div className="relative isolate lg:px-8 flex space-x-5">
      <div className="w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://st2.depositphotos.com/3261171/5213/i/450/depositphotos_52139673-stock-photo-dj-in-tuxedo-mixing-by.jpg"
          alt="Landing"
        />
      </div>
      <div className="w-1/2 mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Hello World
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button color="primary" href="/outfit-generator">
              Get Styled
            </Button>
            <Button color="textOnly" href="#">
              Learn more<span aria-hidden="true"> →</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
