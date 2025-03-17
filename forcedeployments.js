const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'forcedeployment',
    description: 'Forces a deployment embed, bypassing vote requirements.',
    async execute(interaction) {
        // 🚨 FETCH MEMBER TO ENSURE ROLE CACHE IS LOADED
        await interaction.guild.members.fetch(interaction.user.id);

        // 🚨 CHECK IF USER HAS REQUIRED ROLE
        const requiredRoleId = '1351170771673808969'; // Change to your actual required role ID
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: '❌ You do not have permission to force a deployment!', ephemeral: true });
        }

        // 🎯 PING ROLE WHEN DEPLOYMENT IS FORCED
        const voteRoleId = '1332980229886705685'; // Replace with your voting role ID
        const voteRoleMention = `<@&${voteRoleId}>`;

        // 🚀 DEPLOYMENT EMBED
        const deploymentEmbed = new EmbedBuilder()
            .setColor(0x1F8B4C)
            .setTitle('**🚀 FORCED DEPLOYMENT STARTED! 🚀**')
            .setDescription(`Deployment has been manually approved. Make sure to review <#1333049992411086879> and enjoy!

${voteRoleMention}`);

        await interaction.reply({ content: voteRoleMention, embeds: [deploymentEmbed] });
    }
};
