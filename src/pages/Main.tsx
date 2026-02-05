import { Table, type Column } from "../components/Table/Table";

interface RateData {
  id: number;
  name: string;
  logo: string;
  currency: string;
  buyPrice: number;
  sellPrice: number;
}

const mockData: RateData[] = [
  {
    id: 1,
    name: "Banco BHD",
    logo: "https://static.bhd.com.do/bhd_1_35fc248886_c7474096c5.png",
    currency: "USD",
    buyPrice: 71977.29,
    sellPrice: 71977.29,
  },
  {
    id: 2,
    name: "Banco Popular",
    logo: 'https://popularenlinea.com/_catalogs/masterpage/popularenlinea/shared/images/BPD-logo.png',
    currency: "USD",
    buyPrice: 2126.88,
    sellPrice: 2126.88,
  },
  {
    id: 3,
    name: "BanReservas",
    logo: "https://cdnebrpeastus.azureedge.net/banreservas/media/jzvafarv/logo.png",
    currency: "USD",
    buyPrice: 0.9971,
    sellPrice: 0.9971,
  },
  {
    id: 4,
    name: "Scotiabank",
    logo: "https://do.scotiabank.com/content/dam/scotiabank/images/logos/2019/scotiabank-logo-red-desktop-200px.svg",
    currency: "USD",
    buyPrice: 695.23,
    sellPrice: 695.23,
  },
  {
    id: 5,
    name: "Asociacion Popular de Ahorros y Prestamos",
    logo: "https://apap.com.do/wp-content/themes/apap/img/logo.png", 
    currency: "USD",
    buyPrice: 1.4628,
    sellPrice: 1.4628,
  },
];

const columns: Column<RateData>[] = [
  {
    header: "#",
    accessorKey: "id",
    sortable: false,
    className: "w-10 text-center text-gray-500 font-bold",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span>{row.id}</span>
      </div>
    ),
  },
  {
    header: "Bank",
    accessorKey: "name",
    sortable: false,
    cell: (row) => (
        <div className="flex items-center gap-3">
            {row.logo ? (
                <span className="text-xl w-6 text-center">
                    <img src={row.logo} alt="An icon" width="50" height="50"/>
                </span>
            ) : ''}
          <span className="font-bold text-white">{row.name}</span>
        </div>
      ),
  },
  {
    header: "Currency",
    accessorKey: "currency",
    sortable: false,
  },
  {
    header: "Buy Price",
    accessorKey: "buyPrice",
    sortable: true,
    className: "text-green-400",
  },
  {
    header: "Sell Price",
    accessorKey: "sellPrice",
    sortable: true,
    className: "text-red-400",
  },
];

export const Main = () => {
  return (
    <div className="bg-[#0b0e14] min-h-screen p-4 md:p-10 text-white">
      <div className="w-full mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Tasas de cambio en República Dominicana
        </h2>
        <Table data={mockData} columns={columns} />
      </div>
    </div>
  );
};
