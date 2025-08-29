"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconWallet,
  IconQrcode,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";

export default function SidebarDemo({ products = [] }) {
  return <SidebarDemoContent products={products} />;
}

function SidebarDemoContent({ products = [] }) {
  const { userData, connectWallet, disconnectWallet } = useStacks();
  const [open, setOpen] = useState(false);
  
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: userData ? "Disconnect" : "Connect Wallet",
      href: "#",
      icon: (
        <IconWallet className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      action: userData ? disconnectWallet : connectWallet,
    },
  ];
  
  return (
    <div className="flex w-full max-w-7xl mx-auto h-[70vh] relative overflow-hidden rounded-md border border-neutral-700 bg-gray-900/50">
      {/* Collapsible Sidebar */}
      <motion.div
        initial={{ width: "4rem" }}
        animate={{ width: open ? "16rem" : "4rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col bg-gray-800/90 border-r border-neutral-700 relative"
      >
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <button
              aria-label="toggle"
              onClick={() => setOpen((s) => !s)}
              className="text-white text-sm p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
            >
              {open ? '←' : '→'}
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-2">
            {links.map((link, idx) => (
              <li key={idx}>
                {link.action ? (
                  <button
                    onClick={link.action}
                    className="flex items-center gap-3 text-white hover:bg-gray-700/50 px-2 py-2 rounded transition-colors w-full"
                    title={!open ? link.label : undefined}
                  >
                    {link.icon}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: open ? 1 : 0 }}
                      transition={{ duration: 0.2, delay: open ? 0.1 : 0 }}
                      className={cn("whitespace-nowrap", !open && "hidden")}
                    >
                      {link.label}
                    </motion.span>
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-white hover:bg-gray-700/50 px-2 py-2 rounded transition-colors"
                    title={!open ? link.label : undefined}
                  >
                    {link.icon}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: open ? 1 : 0 }}
                      transition={{ duration: 0.2, delay: open ? 0.1 : 0 }}
                      className={cn("whitespace-nowrap", !open && "hidden")}
                    >
                      {link.label}
                    </motion.span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-neutral-700">
          {userData ? (
            <div className="flex items-center gap-3 text-white px-2 py-2">
              <div className="h-6 w-6 shrink-0 rounded-full bg-green-500 flex items-center justify-center">
                <IconWallet className="h-3 w-3 text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ duration: 0.2, delay: open ? 0.1 : 0 }}
                className={cn("text-sm", !open && "hidden")}
              >
                <div className="text-gray-300 text-xs">Wallet Address:</div>
                <div className="text-white font-mono text-xs">
                  {abbreviateAddress(userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet)}
                </div>
              </motion.div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="flex items-center gap-3 text-white hover:bg-gray-700/50 px-2 py-2 rounded transition-colors w-full"
              title={!open ? "Connect Wallet" : undefined}
            >
              <div className="h-6 w-6 shrink-0 rounded-full bg-gray-600 flex items-center justify-center">
                <IconWallet className="h-3 w-3 text-white" />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ duration: 0.2, delay: open ? 0.1 : 0 }}
                className={cn("text-sm whitespace-nowrap", !open && "hidden")}
              >
                Connect Wallet
              </motion.span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Dashboard Content */}
      <Dashboard products={products} />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
      aria-label="Echain Dashboard"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        Echain
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
      aria-label="Echain Logo"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-500" />
    </a>
  );
};

// Dashboard component with real-time statistics
const Dashboard = ({ products = [] }: { products?: any[] }) => {
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [selectedProductForQR, setSelectedProductForQR] = useState<any>(null);

  // Calculate real-time statistics
  const totalProducts = products.length;
  const activeBatches = [...new Set(products.map((p: any) => p.batch).filter(Boolean))].length;
  const qrCodesGenerated = products.filter((p: any) => p.qrCodeUrl).length;
  const totalEvents = products.reduce((acc: number, product: any) => acc + (product.events?.length || 0), 0);

  // Calculate recent activity (products added in last 24 hours)
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const recentActivity = products.filter((product: any) => {
    if (product.createdAt) {
      const createdDate = product.createdAt.toDate ? product.createdAt.toDate() : new Date(product.createdAt);
      return createdDate > yesterday;
    }
    return false;
  }).length;

  // Products without QR codes
  const productsNeedingQR = products.filter((p: any) => !p.qrCodeUrl);

  const generateQRCode = async (product: any) => {
    try {
      // Simple QR code generation logic (you can integrate with a QR service)
      const qrData = {
        productId: product.productId,
        name: product.name,
        batch: product.batch,
        manufacturer: product.manufacturer,
        timestamp: new Date().toISOString()
      };
      
      // This is a placeholder - you would integrate with an actual QR generation service
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(qrData))}`;
      
      // Here you would update the product in your database with the QR code URL
      console.log('Generated QR for product:', product.name, 'URL:', qrCodeUrl);
      alert(`QR Code generated for ${product.name}! (Check console for URL)`);
      
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code');
    }
  };

  const stats = [
    { 
      title: "Total Products", 
      value: totalProducts,
      color: "from-blue-500/20 to-purple-600/20",
      textColor: "text-blue-400"
    },
    { 
      title: "Active Batches", 
      value: activeBatches,
      color: "from-green-500/20 to-emerald-600/20",
      textColor: "text-green-400"
    },
    { 
      title: "QR Codes", 
      value: qrCodesGenerated,
      color: "from-orange-500/20 to-red-600/20",
      textColor: "text-orange-400"
    },
    { 
      title: "Recent Activity", 
      value: recentActivity,
      color: "from-purple-500/20 to-pink-600/20",
      textColor: "text-purple-400"
    },
  ];

  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-3 rounded-tl-2xl border border-neutral-700 bg-gray-900/80 p-4 overflow-y-auto">
        <div className="text-white mb-2">
          <h3 className="text-lg font-semibold">Live Dashboard</h3>
          <p className="text-gray-400 text-sm">Real-time manufacturing statistics</p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={`h-20 rounded-lg bg-gradient-to-br ${stat.color} border border-gray-600 p-3 flex flex-col justify-center`}
            >
              <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>
                {stat.value}
              </div>
              <div className="text-white text-xs font-medium">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* QR Code Generation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-gray-600 rounded-lg p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white text-sm font-semibold flex items-center gap-2">
              <IconQrcode className="h-4 w-4" />
              QR Code Generator
            </h4>
            <button
              onClick={() => setShowQRGenerator(!showQRGenerator)}
              className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-colors"
            >
              {showQRGenerator ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showQRGenerator && (
            <div className="space-y-2">
              <div className="text-xs text-gray-400">
                Products needing QR codes: {productsNeedingQR.length}
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1">
                {productsNeedingQR.slice(0, 3).map((product: any, idx: number) => (
                  <div key={product.id} className="flex items-center justify-between bg-gray-800/50 px-2 py-1 rounded text-xs">
                    <span className="text-white truncate mr-2">{product.name}</span>
                    <button
                      onClick={() => generateQRCode(product)}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                ))}
                {productsNeedingQR.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{productsNeedingQR.length - 3} more products
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Activity Summary */}
        <div className="flex gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-1 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-gray-600 p-3"
          >
            <h4 className="text-white text-sm font-semibold mb-2">Supply Chain Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Events:</span>
                <span className="text-green-400 font-semibold">{totalEvents}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Avg Events/Product:</span>
                <span className="text-blue-400 font-semibold">
                  {totalProducts > 0 ? (totalEvents / totalProducts).toFixed(1) : '0'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">QR Coverage:</span>
                <span className="text-purple-400 font-semibold">
                  {totalProducts > 0 ? Math.round((qrCodesGenerated / totalProducts) * 100) : 0}%
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex-1 rounded-lg bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-gray-600 p-3"
          >
            <h4 className="text-white text-sm font-semibold mb-2">Production Overview</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Production Rate:</span>
                <span className="text-orange-400 font-semibold">{recentActivity}/day</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Batch Diversity:</span>
                <span className="text-yellow-400 font-semibold">{activeBatches} batches</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Status:</span>
                <span className={`font-semibold ${totalProducts > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                  {totalProducts > 0 ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};