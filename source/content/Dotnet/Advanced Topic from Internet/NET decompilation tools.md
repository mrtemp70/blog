The items I've listed — **dnSpy**, **.NET Reflector**, and **ILSpy** — are **.NET decompilation tools**. They're commonly referred to as **NuGet package viewers** or **.NET assembly browsers**, and here's what each one does:

---

### 🔍 **Purpose**

They allow you to **view the internal code (IL/C#)** of .NET assemblies — including those from NuGet packages — even if the source code is not available.

---

### 🧰 Tool Overviews

#### 1. **dnSpy/dnSpyEx**

- An advanced **.NET debugger and assembly editor**.
    
- You can **decompile**, **edit**, and **debug** assemblies (EXE/DLL).
    
- Helpful for reverse engineering, modding, or understanding third-party code.
    
- Can even debug apps without PDBs (debug symbols).
    

✅ **Best for**: Debugging obfuscated or protected code.

🔗 GitHub: [dnSpyEx](https://github.com/dnSpyEx/dnSpy)

---

#### 2. **.NET Reflector**

- One of the **oldest commercial** .NET decompilers (by Red Gate).
    
- Decompiles .NET assemblies to C#, VB.NET, etc.
    
- Has a Visual Studio plugin.
    

✅ **Best for**: Professional use in enterprise environments.

🔗 Website: [Red Gate Reflector](https://www.red-gate.com/products/dotnet-development/reflector/)

---

#### 3. **ILSpy**

- An **open-source .NET decompiler** by the SharpDevelop team.
    
- Very lightweight and reliable.
    
- Supports browsing NuGet packages, PDB loading, etc.
    
- Can also export projects from assemblies.
    

✅ **Best for**: Free and fast decompilation.

🔗 GitHub: [ILSpy](https://github.com/icsharpcode/ILSpy)

---

### 🧠 Common Use Cases

- Inspecting NuGet package internals (when source is unavailable).
    
- Learning how libraries work.
    
- Debugging third-party code.
    
- Analyzing malware or reverse engineering (in security research).
    
- Recovering lost source code.