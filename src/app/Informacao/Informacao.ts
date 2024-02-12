export default class Informacao {
    private id!: number;
    private name!: string;
    private created_at!: string;
    private updated_at!: string;

    public constructor(id: number | null = null, name: string | null = null, created_at: string | null = null, updated_at: string | null = null) {
        if (id !== null)
            this.setId(id);

        if (name !== null)
            this.setName(name);

        if (created_at !== null)
            this.setCreatedAt(created_at);

        if (updated_at !== null)
            this.setUpdatedAt(updated_at);
    }

    private setId(id: number) {
        this.id = id;
    }

    private setName(name: string) {
        this.name = name;
    }

    private setCreatedAt(created_at: string) {
        this.created_at = created_at;
    }

    private setUpdatedAt(updated_at: string) {
        this.updated_at = updated_at;
    }

    public getId() {
        return this.id;
    }
    public getName() {
        return this.name;
    }
    public getCreatedAt() {
        return this.created_at;
    }
    public getUpdatedAt() {
        return this.updated_at;
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

    public toArray(json: string): Informacao[] {
        return JSON.parse(json);
    }

    public static create(name: string) {
        const informacao = new Informacao(null, name);
        informacao.setId(this.get_all().length + 1);
        informacao.setCreatedAt((new Date()).toLocaleString('br'));

        this.insert(informacao);
    }

    public static generateInformations(quantity: number) {
        const modelData = ["Actínio",
            "Alumínio",
            "Amerício",
            "Antimônio",
            "Argônio",
            "Arsênio",
            "Astato",
            "Bário",
            "Berquélio",
            "Berílio",
            "Bismuto",
            "Bóhrio",
            "Boro",
            "Bromo",
            "Cádmio",
            "Cálcio",
            "Califórnio",
            "Carbono",
            "Cério",
            "Césio",
            "Chumbo",
            "Cloro",
            "Cobalto",
            "Cobre",
            "Copernício",
            "Criptônio",
            "Cromo",
            "Cúrio",
            "Darmstádio",
            "Disprósio",
            "Dúbnio",
            "Einstênio",
            "Enxofre",
            "Érbio",
            "Escândio",
            "Estanho",
            "Estrôncio",
            "Európio",
            "Férmio",
            "Ferro",
            "Fleróvio",
            "Flúor",
            "Fósforo",
            "Frâncio",
            "Gadolínio",
            "Gálio",
            "Germânio",
            "Háfnio",
            "Hássio",
            "Hélio",
            "Hidrogênio",
            "Hólmio",
            "Índio",
            "Iodo",
            "Irídio",
            "Itérbio",
            "Ítrio",
            "Lantânio",
            "Laurêncio",
            "Lítio",
            "Livermório",
            "Lutécio",
            "Magnésio",
            "Meitnério",
            "Manganês",
            "Mendelévio",
            "Mercúrio",
            "Molibdênio",
            "Moscóvio",
            "Neodímio",
            "Neônio",
            "Netúnio",
            "Nihônio",
            "Nióbio",
            "Níquel",
            "Nitrogênio",
            "Nobélio",
            "Oganessônio",
            "Ósmio",
            "Ouro",
            "Oxigênio",
            "Paládio",
            "Platina",
            "Plutônio",
            "Polônio",
            "Potássio",
            "Praseodímio",
            "Prata",
            "Promécio",
            "Protactínio",
            "Rádio",
            "Radônio",
            "Rênio",
            "Ródio",
            "Roentgênio",
            "Rubídio",
            "Rutênio",
            "Rutherfórdio",
            "Samário",
            "Seabórgio",
            "Selênio",
            "Silício",
            "Sódio",
            "Tálio",
            "Tantálio",
            "Tecnécio",
            "Telúrio",
            "Tenessino",
            "Térbio",
            "Titânio",
            "Tório",
            "Túlio",
            "Tungstênio",
            "Urânio",
            "Vanádio",
            "Xenônio",
            "Zinco",
            "Zircônio"
        ];

        for (let n = 0; n < quantity; n++) {
            let key = Math.floor(Math.random() * modelData.length);
            this.create(modelData[key]);
        }
    }
    public static update(id: number, name: string): string | Informacao {
        const informacao = this.findById(id);

        if (informacao == undefined)
            return "Não foi possível identificar essa informação";

        this.removeFromId(id);
        informacao.setName(name);
        informacao.setCreatedAt(informacao.created_at);
        informacao.setUpdatedAt((new Date()).toLocaleString('br'))
        this.insert(informacao);
        return informacao;
    }

    private static insert(informacao: Informacao) {
        const data = this.get_all();
        data.push(informacao);
        this.set_all(data);
        return data;
    }

    public static get_all() {
        const result = localStorage.getItem("informacoes");
        if (result !== null)
            return (JSON.parse(result as string) as []).map((value: any) => new Informacao(value.id, value.name, value.created_at, value.updated_at));
        return [];
    }

    private static set_all(informacoes: Informacao[]) {
        localStorage.setItem("informacoes", JSON.stringify(informacoes));
    }

    private static findById(id: number): Informacao | undefined {
        return this.get_all().find((value: Informacao) => value.id == id)
    }
    public delete() {
        Informacao.removeFromId(this.id);
    }
    private static removeFromId(id: number): boolean {
        const data = this.get_all();
        const keyToRemove = data.findIndex((value: Informacao) => value.id == id);
        if (keyToRemove !== null) {
            delete data[keyToRemove];

            this.set_all(data.filter((informacao) => informacao !== undefined));
            return true;
        }

        return false;
    }
}